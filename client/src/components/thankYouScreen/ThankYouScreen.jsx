import { CheckCircle} from 'lucide-react'

export default function ThankYouScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br ">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-lg text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-8">
          We appreciate your submission. Our team will get back to you shortly.
        </p>
      </div>
    </div>
  )
}

