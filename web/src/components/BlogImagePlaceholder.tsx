export default function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="my-8 rounded-xl border-2 border-dashed border-white/20 bg-white/5 p-12 text-center">
      <div className="text-white/30 text-sm font-mono mb-2">Image placeholder</div>
      <div className="text-white/50 text-sm">{label}</div>
    </div>
  );
}
