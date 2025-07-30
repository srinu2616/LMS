import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to Manage Clerk User with database
export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    
    // Verify the webhook
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    });

    const { data, type } = req.body;

    switch (type) {
      case 'user.created': {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        
        await User.create(userData);
        res.json({ success: true, message: "User created successfully" });
        break;
      }
      
      case 'user.updated': {
        const userData = {
          email: data.email_addresses[0].email_address, // Fixed: was email_address
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        
        await User.findByIdAndUpdate(data.id, userData); // Fixed: was UserData
        res.json({ success: true, message: "User updated successfully" });
        break;
      }
      
      case 'user.deleted': {
        await User.findByIdAndDelete(data.id);
        res.json({ success: true, message: "User deleted successfully" });
        break;
      }
      
      default:
        res.json({ success: true, message: "Webhook received but not handled" });
        break;
    }
    
  } catch (error) {
    console.error("Clerk webhook error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};