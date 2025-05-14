import React, { useState } from 'react';
import { ArrowLeft, Upload, Youtube, FileText, Link as LinkIcon, Calendar, UploadCloud } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useToast } from '../context/ToastContext';

const DELIVERY_OPTIONS = [
  { id: 'daily', label: 'Daily', description: 'One lesson every day' },
  { id: 'weekdays', label: 'Weekdays Only', description: 'Monday through Friday' },
  { id: 'weekends', label: 'Weekends Only', description: 'Saturday and Sunday' },
  { id: 'custom', label: 'Custom Schedule', description: 'Set specific days' },
];

const CreateCourse: React.FC = () => {
  const [step, setStep] = useState(1);
  const [courseType, setCourseType] = useState<'youtube' | 'pdf' | ''>('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [courseName, setCourseName] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('daily');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { showToast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };
  
  const handleNextStep = () => {
    if (step === 1) {
      if (courseType === 'youtube' && !youtubeUrl) {
        showToast('Please enter a YouTube playlist URL', 'error');
        return;
      } else if (courseType === 'pdf' && !pdfFile) {
        showToast('Please upload a PDF file', 'error');
        return;
      }
    } else if (step === 2 && !courseName) {
      showToast('Please enter a name for your course', 'error');
      return;
    } else if (step === 3 && !deliveryOption) {
      showToast('Please select a delivery schedule', 'error');
      return;
    }
    
    setStep(step + 1);
  };
  
  const handlePrevStep = () => {
    setStep(step - 1);
  };
  
  const handleSubmit = async () => {
    if (!phoneNumber) {
      showToast('Please enter a valid WhatsApp number', 'error');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success
      showToast('Your course has been created successfully!', 'success');
      // Redirect to dashboard after success
      window.location.href = '/dashboard';
    } catch (error) {
      showToast('Failed to create course. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <Link to="/dashboard" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Dashboard</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">Create Your MicroBurst Course</h1>
        <p className="text-gray-600 mt-2">Transform your content into bite-sized daily lessons</p>
      </div>
      
      {/* Progress steps */}
      <div className="mb-10">
        <div className="flex items-center">
          {[1, 2, 3, 4].map((i) => (
            <React.Fragment key={i}>
              <div 
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  i === step 
                    ? 'border-blue-600 bg-blue-600 text-white' 
                    : i < step 
                      ? 'border-blue-600 bg-white text-blue-600' 
                      : 'border-gray-300 bg-white text-gray-400'
                }`}
              >
                {i < step ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i
                )}
              </div>
              {i < 4 && (
                <div 
                  className={`flex-1 h-0.5 ${
                    i < step ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <div className="text-xs text-gray-500 text-center w-10">Content</div>
          <div className="text-xs text-gray-500 text-center w-10">Details</div>
          <div className="text-xs text-gray-500 text-center w-10">Schedule</div>
          <div className="text-xs text-gray-500 text-center w-10">Delivery</div>
        </div>
      </div>
      
      {/* Step 1: Select Content Type */}
      {step === 1 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Choose Your Content Source</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button
              className={`flex flex-col items-center justify-center p-6 border-2 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors ${
                courseType === 'youtube' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setCourseType('youtube')}
            >
              <Youtube className={`h-10 w-10 mb-3 ${courseType === 'youtube' ? 'text-blue-600' : 'text-gray-500'}`} />
              <h3 className="font-medium text-gray-900">YouTube Playlist</h3>
              <p className="text-sm text-gray-500 text-center mt-2">Convert YouTube playlists into 5-minute video clips</p>
            </button>
            
            <button
              className={`flex flex-col items-center justify-center p-6 border-2 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors ${
                courseType === 'pdf' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setCourseType('pdf')}
            >
              <FileText className={`h-10 w-10 mb-3 ${courseType === 'pdf' ? 'text-blue-600' : 'text-gray-500'}`} />
              <h3 className="font-medium text-gray-900">PDF Book</h3>
              <p className="text-sm text-gray-500 text-center mt-2">Transform PDF books into 3-page bite-sized readings</p>
            </button>
          </div>
          
          {courseType === 'youtube' && (
            <div className="mt-6">
              <Input
                label="YouTube Playlist URL"
                placeholder="https://www.youtube.com/playlist?list=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                icon={<LinkIcon className="h-5 w-5 text-gray-400" />}
              />
              <p className="text-sm text-gray-500 mt-2">
                Paste the full URL of a public YouTube playlist
              </p>
            </div>
          )}
          
          {courseType === 'pdf' && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload PDF</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {pdfFile ? (
                  <div className="text-sm text-gray-900">
                    <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="font-medium">{pdfFile.name}</p>
                    <p className="text-gray-500 mt-1">{(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    <button 
                      className="mt-3 text-blue-600 hover:text-blue-800"
                      onClick={() => setPdfFile(null)}
                    >
                      Replace
                    </button>
                  </div>
                ) : (
                  <div>
                    <UploadCloud className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-2">Drag and drop your PDF here, or</p>
                    <label className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 cursor-pointer transition-colors">
                      Browse Files
                      <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-2">Maximum file size: 50 MB</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Step 2: Course Details */}
      {step === 2 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Course Details</h2>
          
          <div className="space-y-6">
            <Input
              label="Course Name"
              placeholder="E.g., Data Science Fundamentals"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Type</label>
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  {courseType === 'youtube' ? (
                    <>
                      <Youtube className="h-5 w-5 text-red-600 mr-2" />
                      <span className="text-gray-900">YouTube Playlist</span>
                    </>
                  ) : (
                    <>
                      <FileText className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-gray-900">PDF Book</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1 ml-7">
                  {courseType === 'youtube' 
                    ? youtubeUrl 
                    : pdfFile?.name}
                </p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Description (Optional)</label>
              <textarea
                rows={4}
                className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
                placeholder="Describe what learners will get from this course..."
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Step 3: Delivery Schedule */}
      {step === 3 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Schedule</h2>
          <p className="text-gray-600 mb-6">Choose when your daily micro-lessons will be delivered</p>
          
          <div className="space-y-4">
            {DELIVERY_OPTIONS.map((option) => (
              <div 
                key={option.id}
                className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  deliveryOption === option.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setDeliveryOption(option.id)}
              >
                <div>
                  <div 
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      deliveryOption === option.id ? 'border-blue-600' : 'border-gray-300'
                    }`}
                  >
                    {deliveryOption === option.id && (
                      <div className="w-3 h-3 rounded-full bg-blue-600" />
                    )}
                  </div>
                </div>
                <div className="ml-3">
                  <span className="font-medium text-gray-900">{option.label}</span>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Time</label>
            <select 
              className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            >
              <option value="morning">Morning (8 AM)</option>
              <option value="noon">Noon (12 PM)</option>
              <option value="evening">Evening (6 PM)</option>
              <option value="night">Night (9 PM)</option>
            </select>
            <p className="text-sm text-gray-500 mt-2">
              Lessons will be delivered at this time in your local timezone
            </p>
          </div>
        </div>
      )}
      
      {/* Step 4: Messaging Setup */}
      {step === 4 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Messaging Setup</h2>
          <p className="text-gray-600 mb-6">Choose where you want to receive your lessons</p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Method</label>
              <div className="flex space-x-3">
                <div className="flex-1 border-2 border-blue-600 bg-blue-50 rounded-lg p-4 flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345z" />
                      <path d="M20.52 3.449C12.831-3.984 0 1.47 0 12.24c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.977 3.71 1.492 5.715 1.492 10.041 0 15.681-11.153 8.47-20.391z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">WhatsApp</h3>
                    <p className="text-sm text-gray-500">Receive lessons via WhatsApp messages</p>
                  </div>
                </div>
                
                <div className="flex-1 border-2 border-gray-200 rounded-lg p-4 flex items-center opacity-50 cursor-not-allowed">
                  <div className="flex-shrink-0 h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm.24 19.92c-4.584 0-8.304-3.696-8.304-8.304 0-4.584 3.72-8.304 8.304-8.304 2.328 0 4.416.96 5.904 2.496l-2.4 2.304c-.816-.864-2.256-1.464-3.504-1.464-2.952 0-5.352 2.424-5.352 5.352s2.4 5.352 5.352 5.352c2.328 0 3.936-1.32 4.584-3.192h-4.584v-3h7.656c.072.432.12.864.12 1.296 0 4.632-3.264 7.464-7.776 7.464z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-400">Telegram</h3>
                    <p className="text-sm text-gray-400">Coming soon</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Input
              label="WhatsApp Number"
              placeholder="+1 (555) 123-4567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="tel"
            />
            <p className="text-sm text-gray-500 mt-2">
              Enter your full phone number with country code (e.g., +1 for US)
            </p>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-medium text-gray-900 flex items-center">
                <InfoIcon className="h-5 w-5 text-blue-500 mr-2" />
                How It Works
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                After creating your course, you'll receive a welcome message on WhatsApp. Reply "START" to begin receiving your daily micro-lessons.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Navigation buttons */}
      <div className="flex justify-between">
        {step > 1 ? (
          <Button variant="outline" onClick={handlePrevStep}>
            Previous
          </Button>
        ) : (
          <div></div>
        )}
        
        {step < 4 ? (
          <Button onClick={handleNextStep}>
            Continue
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            Create Course
          </Button>
        )}
      </div>
    </div>
  );
};

function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24"
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

export default CreateCourse;