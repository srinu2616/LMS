import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to Manage Clerk User with database
export const clerkWebhooks = async (req, res) => {
  try {
    

    // const { data, type } = req.body;

    // switch (type) {
    //   case 'user.created': {
    //     const userData = {
    //       _id: data.id,
    //       email: data.email_addresses[0].email_address,
    //       name: data.first_name + " " + data.last_name,
    //       imageUrl: data.image_url,
    //     };
        
    //     await User.create(userData);
    //     res.json({ success: true, message: "User created successfully" });
    //     break;
    //   }
      
    //   case 'user.updated': {
    //     const userData = {
    //       email: data.email_addresses[0].email_address, // Fixed: was email_address
    //       name: data.first_name + " " + data.last_name,
    //       imageUrl: data.image_url,
    //     };
        
    //     await User.findByIdAndUpdate(data.id, userData); // Fixed: was UserData
    //     res.json({ success: true, message: "User updated successfully" });
    //     break;
    //   }
      
    //   case 'user.deleted': {
    //     await User.findByIdAndDelete(data.id);
    //     res.json({ success: true, message: "User deleted successfully" });
    //     break;
    //   }
      
    //   default:
    //     res.json({ success: true, message: "Webhook received but not handled" });
    //     break;
    // }

    const type = req.body.type;

    if (type === "user.created") {
      const newUser = new User({
        email: req.body.data.email_addresses[0].email_address,
        name: req.body.data.username,
        clerk_id: req.body.data.id,
        imageUrl: req.body.data.profile_image_url,
      });

      await newUser.save();
      return res.status(201).send("User created");
    } else if (type === "user.updated") {
      const clerk_id = req.body.data.id;
      const user = await User.findOne({ clerk_id: clerk_id });

      if (!user) {
        return res.status(404).send("User not found");
      }

      user.name = req.body.data.username;
      user.imageUrl = req.body.data.profile_image_url;

      await user.save();
      return res.status(200).send("User updated");
    } else if (type === "user.deleted") {
      const user_id = req.body.data.id;
      await User.findOneAndDelete({ clerk_id: user_id });
      return res.status(200).send("User deleted");
    } else {
      console.warn("⚠️ Unhandled event type:", type);
      return res.status(400).send("Unhandled event type");
    }

    
  } catch (error) {
    console.error("Clerk webhook error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};