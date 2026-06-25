"use client";

import { useEffect, useMemo, useState } from "react";
import GlassModal from "./ui/GlassModal";
import { supabase } from "@/app/lib/supabaseClient";

type ServicioCalendario = {
  id: number;
  cliente_id: number;
  tipo_servicio: string;
  fecha: string;
  hora: string | null;
  estado: string;
  estado_pago: string;
  metodo_pago: string | null;
  monto: number | null;
  observaciones: string | null;
  clientes: {
    nombre: string;
    telefono: string | null;
  } | null;
};

type CalendarioModalProps = {
  abierto: boolean;
  onCerrar: () => void;
};

const diasSemana = ["L", "M", "M", "J", "V", "S", "D"];
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default function CalendarioModal({
  abierto,
  onCerrar,
}: CalendarioModalProps) {
  const hoy = new Date();

  const [servicios, setServicios] = useState<ServicioCalendario[]>([]);
  const [cargando, setCargando] = useState(false);
  const [vista, setVista] = useState<"dia" | "semana" | "mes">("mes");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    hoy.toISOString().slice(0, 10)
  );
  const [mesActual, setMesActual] = useState(hoy.getMonth());
  const [anioActual, setAnioActual] = useState(hoy.getFullYear());

  useEffect(() => {
    if (abierto) {
      cargarServiciosDelMes(anioActual, mesActual);
    }
  }, [abierto, anioActual, mesActual]);

  async function cargarServiciosDelMes(anio: number, mes: number) {
    setCargando(true);

    const inicioMes = new Date(anio, mes, 1).toISOString().slice(0, 10);
    const finMes = new Date(anio, mes + 1, 0).toISOString().slice(0, 10);

    const { data, error } = await supabase
      .from("servicios")
      .select(
        `
        id,
        cliente_id,
        tipo_servicio,
        fecha,
        hora,
        estado,
        estado_pago,
        metodo_pago,
        monto,
        observaciones,
        clientes (
          nombre,
          telefono
        )
      `
      )
      .gte("fecha", inicioMes)
      .lte("fecha", finMes)
      .order("fecha", { ascending: true })
      .order("hora", { ascending: true });

    if (error) {
      console.error("Error cargando calendario:", error.message);
      setCargando(false);
      return;
    }

    setServicios((data ?? []) as unknown as ServicioCalendario[]);
    setCargando(false);
  }

  function cambiarMes(direccion: "anterior" | "siguiente") {
    if (direccion === "anterior") {
      if (mesActual === 0) {
        setMesActual(11);
        setAnioActual((prev) => prev - 1);
      } else {
        setMesActual((prev) => prev - 1);
      }
    }

    if (direccion === "siguiente") {
      if (mesActual === 11) {
        setMesActual(0);
        setAnioActual((prev) => prev + 1);
      } else {
        setMesActual((prev) => prev + 1);
      }
    }
  }

  function formatearFecha(anio: number, mes: number, dia: number) {
    return `${anio}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(
      2,
      "0"
    )}`;
  }

  const diasCalendario = useMemo(() => {
    const primerDiaMes = new Date(anioActual, mesActual, 1);
    const ultimoDiaMes = new Date(anioActual, mesActual + 1, 0);
    const totalDias = ultimoDiaMes.getDate();

    let inicioSemana = primerDiaMes.getDay();
    inicioSemana = inicioSemana === 0 ? 6 : inicioSemana - 1;

    const dias: Array<number | null> = [];

    for (let i = 0; i < inicioSemana; i++) {
      dias.push(null);
    }

    for (let dia = 1; dia <= totalDias; dia++) {
      dias.push(dia);
    }

    return dias;
  }, [anioActual, mesActual]);

  function serviciosPorFecha(fecha: string) {
    return servicios.filter((servicio) => servicio.fecha === fecha);
  }

  const serviciosDelDia = serviciosPorFecha(fechaSeleccionada);

  async function actualizarEstado(id: number, nuevoEstado: string) {
    const { error } = await supabase
      .from("servicios")
      .update({ estado: nuevoEstado })
      .eq("id", id);

    if (error) {
      console.error("Error actualizando estado:", error.message);
      return;
    }

    setServicios((prev) =>
      prev.map((servicio) =>
        servicio.id === id ? { ...servicio, estado: nuevoEstado } : servicio
      )
    );
  }

  function obtenerPuntoEstado(serviciosDia: ServicioCalendario[]) {
    if (serviciosDia.some((s) => s.estado === "Cancelado")) {
      return "bg-red-300";
    }

    if (serviciosDia.some((s) => s.estado === "En progreso")) {
      return "bg-emerald-300";
    }

    if (serviciosDia.some((s) => s.estado === "En camino")) {
      return "bg-sky-300";
    }

    if (serviciosDia.some((s) => s.estado === "Pendiente")) {
      return "bg-[#f0c779]";
    }

    return "bg-white/50";
  }

  function estiloEstado(estado: string) {
    if (estado === "Pendiente")
      return "border-[#f0c779]/25 bg-[#d6a85b]/10 text-[#f0c779]";
    if (estado === "En camino")
      return "border-sky-300/25 bg-sky-300/10 text-sky-100";
    if (estado === "En progreso")
      return "border-emerald-300/25 bg-emerald-300/10 text-emerald-100";
    if (estado === "Finalizado")
      return "border-white/10 bg-white/[0.06] text-white/55";
    if (estado === "Cancelado")
      return "border-red-300/25 bg-red-400/10 text-red-200";

    return "border-white/10 bg-white/[0.06] text-white/55";
  }

  return (
    <GlassModal
      abierto={abierto}
      titulo="Calendario inteligente"
      subtitulo="Agenda visual de servicios, estados y jornada diaria."
      onCerrar={onCerrar}
      ancho="grande"
    >
      <div className="space-y-5">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-white/[0.14] via-white/[0.07] to-[#d6a85b]/[0.08] p-5 shadow-[0_0_45px_rgba(214,168,91,0.08)]">
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#f0c779]/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-emerald-300/10 blur-3xl" />

          <div className="relative flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => cambiarMes("anterior")}
              className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.08] text-white/70 transition hover:border-[#d6a85b]/30 hover:text-[#f0c779]"
            >
              ‹
            </button>

            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d6a85b]">
                Vista mensual
              </p>
              <h3 className="mt-1 text-2xl font-semibold text-white">
                {meses[mesActual]} {anioActual}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => cambiarMes("siguiente")}
              className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.08] text-white/70 transition hover:border-[#d6a85b]/30 hover:text-[#f0c779]"
            >
              ›
            </button>
          </div>

          <div className="relative mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-black/15 p-1">
            {(["dia", "semana", "mes"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setVista(item)}
                className={`h-10 rounded-xl text-xs font-semibold uppercase tracking-[0.14em] transition ${
                  vista === item
                    ? "bg-[#d6a85b]/20 text-[#f0c779] shadow-[0_0_24px_rgba(214,168,91,0.12)]"
                    : "text-white/45 hover:text-white/70"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/15 bg-white/[0.08] p-4 backdrop-blur-2xl">
          <div className="grid grid-cols-7 gap-2">
            {diasSemana.map((dia) => (
              <div
                key={dia}
                className="py-2 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40"
              >
                {dia}
              </div>
            ))}

            {diasCalendario.map((dia, index) => {
              if (!dia) {
                return <div key={`empty-${index}`} className="h-16" />;
              }

              const fecha = formatearFecha(anioActual, mesActual, dia);
              const serviciosDia = serviciosPorFecha(fecha);
              const seleccionado = fecha === fechaSeleccionada;
              const esHoy = fecha === new Date().toISOString().slice(0, 10);

              return (
                <button
                  key={fecha}
                  type="button"
                  onClick={() => setFechaSeleccionada(fecha)}
                  className={`relative h-16 rounded-2xl border text-sm font-semibold transition duration-300 ${
                    seleccionado
                      ? "border-[#d6a85b]/60 bg-[#d6a85b]/20 text-[#f0c779] shadow-[0_0_28px_rgba(214,168,91,0.16)]"
                      : esHoy
                      ? "border-emerald-300/35 bg-emerald-300/10 text-emerald-100"
                      : "border-white/10 bg-white/[0.045] text-white/70 hover:border-[#d6a85b]/25 hover:bg-white/[0.08]"
                  }`}
                >
                  <span>{dia}</span>

                  {serviciosDia.length > 0 && (
                    <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${obtenerPuntoEstado(
                          serviciosDia
                        )}`}
                      />
                      {serviciosDia.length > 1 && (
                        <span className="text-[9px] text-white/50">
                          {serviciosDia.length}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d6a85b]">
                Servicios del día
              </p>
              <h3 className="mt-1 text-xl font-semibold text-white">
                {fechaSeleccionada} · {serviciosDelDia.length} servicios
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            {cargando && (
              <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-5 text-center">
                <p className="text-sm font-semibold text-white/70">
                  Cargando calendario...
                </p>
              </div>
            )}

            {!cargando && serviciosDelDia.length === 0 && (
              <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-5 text-center">
                <p className="text-sm font-semibold text-white/70">
                  No hay servicios para este día
                </p>
                <p className="mt-1 text-xs text-white/35">
                  Los días con punto tienen servicios registrados.
                </p>
              </div>
            )}

            {!cargando &&
              serviciosDelDia.map((servicio) => (
                <article
                  key={servicio.id}
                  className="rounded-[1.7rem] border border-white/10 bg-white/[0.065] p-4 shadow-xl shadow-black/10 backdrop-blur-2xl transition duration-500 hover:border-[#d6a85b]/25 hover:bg-white/[0.09]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-lg font-semibold text-white">
                        {servicio.clientes?.nombre || "Cliente sin nombre"}
                      </h4>
                      <p className="mt-1 text-sm text-white/45">
                        {servicio.hora || "Sin hora"} ·{" "}
                        {servicio.tipo_servicio}
                      </p>
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${estiloEstado(
                        servicio.estado
                      )}`}
                    >
                      {servicio.estado}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-white/30">
                        Pago
                      </p>
                      <p
                        className={`mt-1 text-sm font-semibold ${
                          servicio.estado_pago === "Pagado"
                            ? "text-emerald-200"
                            : "text-red-200"
                        }`}
                      >
                        {servicio.estado_pago}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-white/30">
                        Monto
                      </p>
                      <p className="mt-1 text-sm text-white/75">
                        {servicio.monto ? `₡${servicio.monto}` : "Sin monto"}
                      </p>
                    </div>
                  </div>

                  {servicio.observaciones && (
                    <p className="mt-3 text-sm text-white/40">
                      {servicio.observaciones}
                    </p>
                  )}

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => actualizarEstado(servicio.id, "En camino")}
                      className="h-10 rounded-2xl border border-sky-300/20 bg-sky-300/10 text-xs font-semibold text-sky-100 transition hover:bg-sky-300/15"
                    >
                      En camino
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        actualizarEstado(servicio.id, "En progreso")
                      }
                      className="h-10 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-xs font-semibold text-emerald-100 transition hover:bg-emerald-300/15"
                    >
                      Iniciar
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        actualizarEstado(servicio.id, "Finalizado")
                      }
                      className="h-10 rounded-2xl border border-white/10 bg-white/[0.06] text-xs font-semibold text-white/60 transition hover:text-white"
                    >
                      Finalizar
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        actualizarEstado(servicio.id, "Cancelado")
                      }
                      className="h-10 rounded-2xl border border-red-300/20 bg-red-400/10 text-xs font-semibold text-red-200 transition hover:bg-red-400/15"
                    >
                      Cancelar
                    </button>
                  </div>
                </article>
              ))}
          </div>
        </section>
      </div>
    </GlassModal>
  );
}