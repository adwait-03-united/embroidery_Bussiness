export default function SectionTitle({ label, title, subtitle }) {
  return (
    <div className="text-center mb-10">
      {label && (
        <p className="text-xs tracking-widest uppercase text-[#c8a97e] mb-2">{label}</p>
      )}
      <h2 className="font-heading text-3xl md:text-4xl text-[#1a1a1a]">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-sm text-[#5f5e5a] max-w-lg mx-auto leading-relaxed">{subtitle}</p>
      )}
    </div>
  )
}