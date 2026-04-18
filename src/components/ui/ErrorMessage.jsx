export default function ErrorMessage({ message = 'Something went wrong. Please try again.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-4xl mb-4">⚠</div>
      <p className="text-sm text-[#5f5e5a] max-w-xs">{message}</p>
    </div>
  )
} 