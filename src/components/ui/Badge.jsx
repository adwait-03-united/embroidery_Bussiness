export default function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-[#e8e0d5] text-[#1a1a1a]',
    gold:    'bg-[#c8a97e] text-white',
    accent:  'bg-[#d94f3d] text-white',
    outline: 'border border-[#1a1a1a] text-[#1a1a1a]',
  }
  return (
    <span className={`inline-block text-[10px] font-medium tracking-widest uppercase px-3 py-1 rounded-full ${variants[variant]}`}>
      {children}
    </span>
  )
}