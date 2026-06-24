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
    <main className="grid min-h-screen place-items-center bg-[#f6f8f3] px-5 text-[#172014]">
      <section className="w-full max-w-md rounded-3xl border border-[#dfe8d1] bg-white p-8 shadow-xl shadow-[#243d1f]/10">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6f8b3d]">
          Acceso privado
        </p>

        <h1 className="mt-3 text-3xl font-semibold">Panel administrativo</h1>

        <p className="mt-3 text-sm leading-6 text-[#52624c]">
          Ingresa con el usuario administrador para gestionar clientes, citas y
          solicitudes de Rodriguez Garden Service.
        </p>

        <form className="mt-8 space-y-4" onSubmit={ingresar}>
          <label className="block">
            <span className="text-sm font-medium">Correo electrónico</span>
            <input
              className="mt-2 h-12 w-full rounded-2xl border border-[#cddabf] bg-[#fbfcf8] px-4 outline-none transition focus:border-[#6f8b3d] focus:ring-4 focus:ring-[#6f8b3d]/15"
              placeholder="admin@rodriguezgardenservice.com"
              type="email"
              value={correo}
              onChange={(event) => setCorreo(event.target.value)}
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Contraseña</span>
            <input
              className="mt-2 h-12 w-full rounded-2xl border border-[#cddabf] bg-[#fbfcf8] px-4 outline-none transition focus:border-[#6f8b3d] focus:ring-4 focus:ring-[#6f8b3d]/15"
              placeholder="********"
              type="password"
              value={contrasena}
              onChange={(event) => setContrasena(event.target.value)}
              required
            />
          </label>

          {mensaje && (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {mensaje}
            </p>
          )}

          <button
            className="h-12 w-full rounded-2xl bg-[#243d1f] text-sm font-semibold text-white transition hover:bg-[#315729] disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={cargando}
          >
            {cargando ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </section>
    </main>
  );
}
