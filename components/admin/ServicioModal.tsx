"use client";

import { useState } from "react";
import GlassModal from "./ui/GlassModal";
import { supabase } from "@/app/lib/supabaseClient";

type ClienteServicio = {
  id: number;
  nombre: string;
  telefono?: string | null;
  frecuencia?: string | null;
};

type ServicioModalProps = {
  abierto: boolean;
  cliente: ClienteServicio | null;
  onCerrar: () => void;
};

export default function ServicioModal({
  abierto,
  cliente,
  onCerrar,
}: ServicioModalProps) {
  const [cargando, setCargando] = useState(false);

  const [formulario, setFormulario] = useState({
    tipoServicio: "Mantenimiento",
    fecha: "",
    hora: "",
    estado: "Pendiente",
    empleado: "",
    observaciones: "",
    estadoPago: "Pendiente",
    metodoPago: "",
    monto: "",
  });

  function cambiarCampo(campo: keyof typeof formulario, valor: string) {
    setFormulario((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  function limpiarFormulario() {
    setFormulario({
      tipoServicio: "Mantenimiento",
      fecha: "",
      hora: "",
      estado: "Pendiente",
      empleado: "",
      observaciones: "",
      estadoPago: "Pendiente",
      metodoPago: "",
      monto: "",
    });
  }

  function cerrarModal() {
    limpiarFormulario();
    onCerrar();
  }

  async function guardarServicio() {
    if (!cliente || !formulario.fecha) return;

    setCargando(true);

    const { error } = await supabase.from("servicios").insert({
      cliente_id: cliente.id,
      tipo_servicio: formulario.tipoServicio,
      fecha: formulario.fecha,
      hora: formulario.hora || null,
      estado: formulario.estado,
      empleado: formulario.empleado.trim() || null,
      observaciones: formulario.observaciones.trim() || null,
      estado_pago: formulario.estadoPago,
      metodo_pago:
        formulario.estadoPago === "Pagado"
          ? formulario.metodoPago || null
          : null,
      monto: formulario.monto ? Number(formulario.monto) : null,
    });

    if (error) {
      console.error("Error guardando servicio:", error.message);
      setCargando(false);
      return;
    }

    limpiarFormulario();
    setCargando(false);
    onCerrar();
  }

  return (
    <GlassModal
      abierto={abierto}
      titulo="Nuevo servicio"
      subtitulo={
        cliente
          ? `Servicio para ${cliente.nombre}`
          : "Selecciona un cliente para crear el servicio."
      }
      onCerrar={cerrarModal}
    >
      <div className="space-y-5">
        <div className="rounded-[1.6rem] border border-[#d6a85b]/15 bg-[#d6a85b]/[0.06] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f0c779]">
            Cliente seleccionado
          </p>

          <h3 className="mt-2 text-lg font-semibold text-white">
            {cliente?.nombre || "Sin cliente"}
          </h3>

          <p className="mt-1 text-sm text-white/45">
            {cliente?.telefono || "Sin teléfono"} ·{" "}
            {cliente?.frecuencia || "Frecuencia no definida"}
          </p>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
            Tipo de servicio
          </label>
          <select
            value={formulario.tipoServicio}
            onChange={(e) => cambiarCampo("tipoServicio", e.target.value)}
            className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-[#07100b] px-4 text-sm text-white outline-none focus:border-[#d6a85b]/35"
          >
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Poda">Poda</option>
            <option value="Limpieza general">Limpieza general</option>
            <option value="Colocación de césped">Colocación de césped</option>
            <option value="Siembra">Siembra</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
              Fecha
            </label>
            <input
              type="date"
              value={formulario.fecha}
              onChange={(e) => cambiarCampo("fecha", e.target.value)}
              className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-[#07100b] px-4 text-sm text-white outline-none focus:border-[#d6a85b]/35"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
              Hora
            </label>
            <input
              type="time"
              value={formulario.hora}
              onChange={(e) => cambiarCampo("hora", e.target.value)}
              className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-[#07100b] px-4 text-sm text-white outline-none focus:border-[#d6a85b]/35"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
            Estado del servicio
          </label>
          <select
            value={formulario.estado}
            onChange={(e) => cambiarCampo("estado", e.target.value)}
            className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-[#07100b] px-4 text-sm text-white outline-none focus:border-[#d6a85b]/35"
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En camino">En camino</option>
            <option value="En progreso">En progreso</option>
            <option value="Finalizado">Finalizado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
            Empleado
          </label>
          <input
            type="text"
            value={formulario.empleado}
            onChange={(e) => cambiarCampo("empleado", e.target.value)}
            placeholder="Ej: Rodríguez"
            className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#d6a85b]/35"
          />
        </div>

        <section className="rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d6a85b]">
                Pago del servicio
              </p>
              <p className="mt-1 text-sm text-white/40">
                Marca si el servicio fue cancelado.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                cambiarCampo(
                  "estadoPago",
                  formulario.estadoPago === "Pagado" ? "Pendiente" : "Pagado"
                )
              }
              className={`relative h-8 w-16 rounded-full border transition duration-300 ${
                formulario.estadoPago === "Pagado"
                  ? "border-emerald-300/30 bg-emerald-300/20"
                  : "border-red-300/25 bg-red-400/10"
              }`}
            >
              <span
                className={`absolute top-1 h-6 w-6 rounded-full transition duration-300 ${
                  formulario.estadoPago === "Pagado"
                    ? "left-9 bg-emerald-200 shadow-[0_0_18px_rgba(110,231,183,0.35)]"
                    : "left-1 bg-red-200 shadow-[0_0_18px_rgba(248,113,113,0.25)]"
                }`}
              />
            </button>
          </div>

          <div
            className={`mt-4 rounded-2xl border px-4 py-3 text-center text-sm font-semibold ${
              formulario.estadoPago === "Pagado"
                ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-200"
                : "border-red-300/20 bg-red-400/10 text-red-200"
            }`}
          >
            {formulario.estadoPago === "Pagado"
              ? "Servicio pagado"
              : "Pago pendiente"}
          </div>

          <div className="mt-4">
            <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
              Monto
            </label>
            <input
              type="number"
              min="0"
              value={formulario.monto}
              onChange={(e) => cambiarCampo("monto", e.target.value)}
              placeholder="Ej: 25000"
              className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#d6a85b]/35"
            />
          </div>

          {formulario.estadoPago === "Pagado" && (
            <div className="mt-4">
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                Método de pago
              </label>
              <select
                value={formulario.metodoPago}
                onChange={(e) => cambiarCampo("metodoPago", e.target.value)}
                className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-[#07100b] px-4 text-sm text-white outline-none focus:border-[#d6a85b]/35"
              >
                <option value="">Seleccionar método</option>
                <option value="Efectivo">Efectivo</option>
                <option value="SINPE">SINPE</option>
                <option value="Transferencia">Transferencia</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
          )}
        </section>

        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
            Observaciones
          </label>
          <textarea
            rows={3}
            value={formulario.observaciones}
            onChange={(e) => cambiarCampo("observaciones", e.target.value)}
            placeholder="Detalles importantes del servicio..."
            className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#d6a85b]/35"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={cerrarModal}
            className="h-12 rounded-2xl border border-white/10 bg-white/[0.06] text-sm font-semibold text-white/60 transition hover:text-white"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={guardarServicio}
            disabled={cargando}
            className="h-12 rounded-2xl border border-[#d6a85b]/30 bg-[#d6a85b]/15 text-sm font-semibold text-[#f0c779] shadow-[0_0_28px_rgba(214,168,91,0.12)] transition hover:bg-[#d6a85b]/20 disabled:opacity-50"
          >
            {cargando ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </GlassModal>
  );
}