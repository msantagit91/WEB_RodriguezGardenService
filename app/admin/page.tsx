export default function AdminLogin() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f6f8f3] px-5 text-[#172014]">
      <section className="w-full max-w-md rounded-3xl border border-[#dfe8d1] bg-white p-8 shadow-xl shadow-[#243d1f]/10">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6f8b3d]">
          Acceso privado
        </p>
        <h1 className="mt-3 text-3xl font-semibold">Panel administrativo</h1>
        <p className="mt-3 text-sm leading-6 text-[#52624c]">
          Esta entrada sera exclusiva para el dueno de la empresa. Luego la
          conectaremos con Supabase Auth.
        </p>

        <form className="mt-8 space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Correo electronico</span>
            <input
              className="mt-2 h-12 w-full rounded-2xl border border-[#cddabf] bg-[#fbfcf8] px-4 outline-none transition focus:border-[#6f8b3d] focus:ring-4 focus:ring-[#6f8b3d]/15"
              placeholder="admin@empresa.com"
              type="email"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Contrasena</span>
            <input
              className="mt-2 h-12 w-full rounded-2xl border border-[#cddabf] bg-[#fbfcf8] px-4 outline-none transition focus:border-[#6f8b3d] focus:ring-4 focus:ring-[#6f8b3d]/15"
              placeholder="********"
              type="password"
            />
          </label>
          <button
            className="h-12 w-full rounded-2xl bg-[#243d1f] text-sm font-semibold text-white transition hover:bg-[#315729]"
            type="button"
          >
            Ingresar
          </button>
        </form>
      </section>
    </main>
  );
}
