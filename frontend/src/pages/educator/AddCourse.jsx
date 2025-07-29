import React, { useEffect, useRef, useState } from "react";
import uniqid from "uniqid";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { assets } from "../../assets/assets";

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const [image, setImage] = useState(null); // Added missing image state

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPop] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter Chapter name');
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    }
    else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    }
    else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPop(true);
    }
    else if (action === 'remove') {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            const updatedContent = [...chapter.chapterContent];
            updatedContent.splice(lectureIndex, 1);
            return { ...chapter, chapterContent: updatedContent };
          }
          return chapter;
        })
      );
    }
  };

  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder: chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1 : 1,
            lectureId: uniqid()
          };
          return {
            ...chapter,
            chapterContent: [...chapter.chapterContent, newLecture]
          };
        }
        return chapter;
      })
    );
    setShowPop(false);
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit logic here
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            ["link", "blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }]
          ]
        },
        placeholder: "Write course description here...",
      });
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Course Title</label>
          <input
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            type="text"
            placeholder="Enter the course Title"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Course Description</label>
          <div 
            ref={editorRef} 
            className="min-h-[200px] border border-gray-300 rounded-md bg-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Course Price</label>
            <input
              onChange={(e) => setCoursePrice(e.target.value)}
              value={coursePrice}
              type="number"
              placeholder="0"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Discount %</label>
            <input
              onChange={(e) => setDiscount(e.target.value)}
              value={discount}
              type="number"
              placeholder="0"
              min={0}
              max={100}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Course Thumbnail</label>
          <label htmlFor="thumbnailImage" className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4 cursor-pointer hover:border-blue-500 transition-colors">
            {image ? (
              <img 
                src={URL.createObjectURL(image)} 
                alt="Course thumbnail preview" 
                className="h-40 w-full object-cover rounded-md mb-2"
              />
            ) : (
              <>
                <img src={assets.file_upload_icon} alt="Upload icon" className="h-10 w-10 opacity-70 mb-2" />
                <span className="text-sm text-gray-500">Click to upload thumbnail</span>
              </>
            )}
            <input
              type="file"
              id="thumbnailImage"
              onChange={(e) => e.target.files?.[0] && setImage(e.target.files[0])}
              accept="image/*"
              className="hidden"
            />
          </label>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Course Chapters</h3>
          
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapter.chapterId} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="flex justify-between items-center p-4 bg-gray-50">
                <div className="flex items-center space-x-3">
                  <button onClick={() => handleChapter('toggle', chapter.chapterId)}>
                    <img src={assets.dropdown_icon} width={14} alt="Toggle chapter" className={`transition-transform ${chapter.collapsed ? 'rotate-0' : 'rotate-90'}`} />
                  </button>
                  <span className="font-medium">
                    {chapterIndex + 1}. {chapter.chapterTitle}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{chapter.chapterContent.length} Lectures</span>
                  <button onClick={() => handleChapter('remove', chapter.chapterId)}>
                    <img src={assets.cross_icon} alt="Remove chapter" className="h-4 w-4 opacity-70 hover:opacity-100" />
                  </button>
                </div>
              </div>

              {!chapter.collapsed && (
                <div className="p-4 space-y-3">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div key={lecture.lectureId} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <span className="font-medium">
                          {lectureIndex + 1}. {lecture.lectureTitle} - {lecture.lectureDuration} mins - 
                          <a href={lecture.lectureUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 ml-1">
                            Link
                          </a>
                          {lecture.isPreviewFree && (
                            <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Free Preview</span>
                          )}
                        </span>
                      </div>
                      <button onClick={() => handleLecture('remove', chapter.chapterId, lectureIndex)}>
                        <img src={assets.cross_icon} alt="Remove lecture" className="h-4 w-4 opacity-70 hover:opacity-100" />
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => handleLecture('add', chapter.chapterId)}
                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    <span className="mr-1">+</span> Add Lecture
                  </button>
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => handleChapter('add')}
            className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            <span className="mr-1">+</span> Add Chapter
          </button>
        </div>

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Add Lecture</h2>
                <button onClick={() => setShowPop(false)}>
                  <img src={assets.cross_icon} alt="Close" className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Lecture Title</label>
                  <input
                    type="text"
                    value={lectureDetails.lectureTitle}
                    onChange={(e) => setLectureDetails({...lectureDetails, lectureTitle: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                  <input
                    type="number"
                    value={lectureDetails.lectureDuration}
                    onChange={(e) => setLectureDetails({...lectureDetails, lectureDuration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Lecture URL</label>
                  <input
                    type="text"
                    value={lectureDetails.lectureUrl}
                    onChange={(e) => setLectureDetails({...lectureDetails, lectureUrl: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="previewFree"
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) => setLectureDetails({...lectureDetails, isPreviewFree: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="previewFree" className="text-sm font-medium text-gray-700">
                    Is preview Free?
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowPop(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={addLecture}
                    className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Add Lecture
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="pt-6">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-blue-600 rounded-md text-lg font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;