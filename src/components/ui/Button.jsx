export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  ...props
}) {
  const base = 'inline-flex items-center justify-center font-body tracking-widest text-xs uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-brand-black text-brand-white hover:bg-brand-olive',
    outline: 'border border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-white',
    ghost: 'text-brand-muted hover:text-brand-black',
    gold: 'bg-brand-gold text-brand-white hover:opacity-90',
  }

  const sizes = {
    sm: 'px-4 py-2',
    md: 'px-6 py-3',
    lg: 'px-8 py-4',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  )
}