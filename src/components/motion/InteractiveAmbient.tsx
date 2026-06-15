/** Static premium ambient — no scroll subscriptions, GPU-friendly gradients */
const InteractiveAmbient = () => (
  <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
    <div
      className="absolute top-[12%] right-[6%] w-64 h-64 rounded-full opacity-40"
      style={{
        background: "radial-gradient(circle, rgba(82, 11, 16, 0.06) 0%, transparent 70%)",
      }}
    />
    <div
      className="absolute bottom-[18%] left-[4%] w-80 h-80 rounded-full opacity-30"
      style={{
        background: "radial-gradient(circle, rgba(122, 21, 32, 0.05) 0%, transparent 70%)",
      }}
    />
  </div>
);

export default InteractiveAmbient;
