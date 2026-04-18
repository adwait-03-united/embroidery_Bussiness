export default function About() {
  const values = [
    { title: 'Hand Embroidered', desc: 'Every motif is stitched by skilled artisans — no machine shortcuts.' },
    { title: 'Premium Fabrics',  desc: 'We source 100% organic cotton and linen from certified mills.' },
    { title: 'Slow Fashion',     desc: 'Small batch drops. Made to order. Zero excess inventory.' },
  ]

  return (
    <div>
      <section className="bg-[#1a1a1a] text-white text-center py-24 px-5">
        <p className="text-xs tracking-widest uppercase text-[#c8a97e] mb-3">Our Story</p>
        <h1 className="font-heading text-4xl md:text-6xl mb-6 leading-tight">
          Crafted by Hand.<br />Made to Last.
        </h1>
        <p className="text-[#b4b2a9] max-w-lg mx-auto text-sm leading-relaxed">
          Stitch & Co started in a small workshop in Pune with one embroidery frame
          and a belief that everyday clothing should feel extraordinary.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-5 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map(v => (
          <div key={v.title} className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#e8e0d5] flex items-center justify-center mx-auto mb-4">
              <span className="text-[#c8a97e] text-xl">✦</span>
            </div>
            <h3 className="font-heading text-lg mb-2 text-[#1a1a1a]">{v.title}</h3>
            <p className="text-sm text-[#5f5e5a] leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </section>
    </div>
  )
}