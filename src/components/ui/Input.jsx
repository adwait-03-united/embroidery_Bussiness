export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-medium tracking-wide uppercase text-[#5f5e5a]">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 text-sm border border-[#e8e0d5] bg-white rounded
          focus:outline-none focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e]
          placeholder:text-[#b4b2a9] transition-colors ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-[#d94f3d]">{error}</p>}
    </div>
  )
}