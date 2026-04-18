export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-[#1a1a1a] text-white hover:bg-[#c8a97e]',
    outline: 'border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white',
    ghost:   'text-[#1a1a1a] hover:text-[#c8a97e] underline underline-offset-4',
    accent:  'bg-[#d94f3d] text-white hover:bg-[#b83d2d]',
  }
  const sizes = {
    sm: 'text-xs px-4 py-2 rounded',
    md: 'text-sm px-6 py-3 rounded',
    lg: 'text-base px-8 py-4 rounded',
  }
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}