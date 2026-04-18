export default function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-brand-cream text-brand-olive',
    gold: 'bg-brand-gold text-white',
    new: 'bg-brand-black text-brand-white',
    sale: 'bg-brand-error text-white',
  }
  return (
    <span className={`text-xs tracking-widest uppercase px-2 py-1 ${variants[variant]}`}>
      {children}
    </span>
  )
}