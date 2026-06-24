"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function AdminLogin() {
  const router = useRouter();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  async function ingresar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMensaje("");
    setCargando(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: correo,
      password: contrasena,
    });

    setCargando(false);

    if (error) {
      setMensaje("Correo o contraseña incorrectos.");
      return;
    }

    router.push("/dashboard");
  }

  return (
   <main className="relative min-h-screen overflow-hidden bg-[#010403] text-white">
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(214,168,91,0.12),transparent_32%),radial-gradient(circle_at_85%_22%,rgba(54,111,68,0.14),transparent_36%),linear-gradient(180deg,#010403_0%,#06110b_45%,#020604_100%)]" />

  <div className="pointer-events-none absolute inset-0 opacity-35">
    <div className="absolute left-[12%] top-[18%] h-3 w-3 animate-pulse rounded-full bg-[#d6a85b]/70 shadow-[0_0_28px_rgba(214,168,91,0.55)]" />
    <div className="absolute left-[42%] top-[12%] h-2 w-2 animate-pulse rounded-full bg-emerald-300/50 shadow-[0_0_24px_rgba(110,231,183,0.35)]" />
    <div className="absolute right-[18%] top-[30%] h-4 w-4 animate-pulse rounded-full bg-[#d6a85b]/45 shadow-[0_0_32px_rgba(214,168,91,0.4)]" />
    <div className="absolute left-[22%] bottom-[28%] h-4 w-4 animate-pulse rounded-full bg-emerald-300/40 shadow-[0_0_30px_rgba(110,231,183,0.3)]" />
    <div className="absolute right-[22%] bottom-[18%] h-2.5 w-2.5 animate-pulse rounded-full bg-[#d6a85b]/55 shadow-[0_0_26px_rgba(214,168,91,0.45)]" />

    <div className="absolute left-[14%] top-[20%] h-px w-[140px] rotate-[18deg] bg-gradient-to-r from-[#d6a85b]/35 to-transparent" />
    <div className="absolute right-[22%] top-[33%] h-px w-[120px] -rotate-[28deg] bg-gradient-to-r from-emerald-300/25 to-transparent" />
    <div className="absolute bottom-[24%] left-[26%] h-px w-[160px] rotate-[-14deg] bg-gradient-to-r from-[#d6a85b]/25 to-transparent" />
  </div>

  <div className="pointer-events-none absolute -left-28 top-16 h-80 w-80 animate-pulse rounded-full bg-[#d6a85b]/8 blur-3xl" />
  <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 animate-pulse rounded-full bg-emerald-400/8 blur-3xl" />

      <section className="relative mx-auto grid min-h-screen max-w-md place-items-center px-5 py-8">
        <div className="w-full">
          <div className="mb-8 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#d6a85b]">
              Jardin Admin
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Rodriguez Garden Service
            </h1>

            <p className="mt-2 text-xs uppercase tracking-[0.24em] text-white/40">
              Business Operations
            </p>
          </div>

          <section className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/[0.065] p-6 shadow-2xl shadow-black/35 backdrop-blur-3xl">
            <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full border border-[#d6a85b]/10 bg-[#d6a85b]/[0.04]" />
            <div className="pointer-events-none absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-emerald-400/[0.045] blur-3xl" />

            <div className="relative">
              <p className="text-sm font-medium text-white/45">
                Acceso privado
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                Panel operativo
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/45">
                Ingresa para gestionar clientes, servicios, pagos y agenda
                operativa.
              </p>

              <form className="mt-7 space-y-4" onSubmit={ingresar}>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                    Correo electrónico
                  </span>

                  <input
                    className="mt-2 h-13 w-full rounded-2xl border border-white/10 bg-white/[0.055] px-4 text-sm text-white outline-none backdrop-blur-xl transition placeholder:text-white/25 focus:border-[#d6a85b]/40 focus:bg-white/[0.075] focus:ring-4 focus:ring-[#d6a85b]/10"
                    placeholder="admin@empresa.com"
                    type="email"
                    value={correo}
                    onChange={(event) => setCorreo(event.target.value)}
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                    Contraseña
                  </span>

                  <input
                    className="mt-2 h-13 w-full rounded-2xl border border-white/10 bg-white/[0.055] px-4 text-sm text-white outline-none backdrop-blur-xl transition placeholder:text-white/25 focus:border-[#d6a85b]/40 focus:bg-white/[0.075] focus:ring-4 focus:ring-[#d6a85b]/10"
                    placeholder="••••••••"
                    type="password"
                    value={contrasena}
                    onChange={(event) => setContrasena(event.target.value)}
                    required
                  />
                </label>

                {mensaje && (
                  <p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {mensaje}
                  </p>
                )}

                <button
                  className="group relative mt-2 h-13 w-full overflow-hidden rounded-2xl border border-[#d6a85b]/25 bg-[#d6a85b]/10 text-sm font-semibold text-[#f0c779] shadow-xl shadow-black/20 transition duration-500 hover:-translate-y-0.5 hover:border-[#f0c779]/40 hover:bg-[#d6a85b]/15 hover:shadow-[0_0_35px_rgba(214,168,91,0.14)] disabled:cursor-not-allowed disabled:opacity-60"
                  type="submit"
                  disabled={cargando}
                >
                  <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(240,199,121,0.28),transparent_45%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                  <span className="relative">
                    {cargando ? "Ingresando..." : "Ingresar al panel"}
                  </span>
                </button>
              </form>
            </div>
          </section>

          <p className="mt-6 text-center text-xs text-white/30">
            Acceso exclusivo para administración autorizada.
          </p>
        </div>
      </section>
    </main>
  );
}
