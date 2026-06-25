"use client";

import { useEffect, useRef, useState } from "react";
import GlassModal from "./ui/GlassModal";
import { supabase } from "@/app/lib/supabaseClient";
import ServicioModal from "./ServicioModal";

type Cliente = {
  id: number;
  nombre: string;
  telefono: string | null;
  frecuencia: string;
  ultima_visita: string | null;
  estado: string;
  observaciones: string | null;
};

type ClienteModalProps = {
  abierto: boolean;
  onCerrar: () => void;
};

export default function ClienteModal({ abierto, onCerrar }: ClienteModalProps) {
  const formularioRef = useRef<HTMLFormElement | null>(null);
  const listaRef = useRef<HTMLDivElement | null>(null);

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteEditandoId, setClienteEditandoId] = useState<number | null>(null);
  const [clienteMarcadoId, setClienteMarcadoId] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);
  const [servicioModalAbierto, setServicioModalAbierto] = useState(false);
const [clienteServicio, setClienteServicio] = useState<Cliente | null>(null);

  const [formulario, setFormulario] = useState({
    nombre: "",
    telefono: "",
    frecuencia: "Ocasional",
    ultimaVisita: "",
    estado: "Activo",
    observaciones: "",
  });

  const clientesFiltrados = clientes.filter((cliente) => {
    const texto = `${cliente.nombre} ${cliente.telefono ?? ""} ${cliente.frecuencia} ${cliente.estado} ${cliente.observaciones ?? ""}`.toLowerCase();
    return texto.includes(busqueda.toLowerCase());
  });

  useEffect(() => {
    if (abierto) cargarClientes();
  }, [abierto]);

  async function cargarClientes() {
    setCargando(true);

    const { data, error } = await supabase
      .from("clientes")
      .select("*")
      .order("creado_en", { ascending: false });

    if (error) {
      console.error("Error cargando clientes:", error.message);
      setCargando(false);
      return;
    }

    setClientes(data || []);
    setCargando(false);
  }

  function cambiarCampo(campo: keyof typeof formulario, valor: string) {
    setFormulario((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  function limpiarFormulario() {
    setFormulario({
      nombre: "",
      telefono: "",
      frecuencia: "Ocasional",
      ultimaVisita: "",
      estado: "Activo",
      observaciones: "",
    });

    setClienteEditandoId(null);
  }

  async function guardarCliente() {
    if (!formulario.nombre.trim()) return;

    setCargando(true);

    const datosCliente = {
      nombre: formulario.nombre.trim(),
      telefono: formulario.telefono.trim() || null,
      frecuencia: formulario.frecuencia,
      ultima_visita: formulario.ultimaVisita || null,
      estado: formulario.estado,
      observaciones: formulario.observaciones.trim() || null,
    };

    if (clienteEditandoId) {
      const { error } = await supabase
        .from("clientes")
        .update(datosCliente)
        .eq("id", clienteEditandoId);

      if (error) {
        console.error("Error actualizando cliente:", error.message);
        setCargando(false);
        return;
      }

      setClienteMarcadoId(clienteEditandoId);
      await cargarClientes();

      setTimeout(() => {
        listaRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 200);

      setTimeout(() => setClienteMarcadoId(null), 1800);
      limpiarFormulario();
      setCargando(false);
      return;
    }

    const { data, error } = await supabase
      .from("clientes")
      .insert(datosCliente)
      .select()
      .single();

    if (error) {
      console.error("Error guardando cliente:", error.message);
      setCargando(false);
      return;
    }

    await cargarClientes();

    if (data) {
      setClienteMarcadoId(data.id);
      setTimeout(() => setClienteMarcadoId(null), 1800);
    }

    setBusqueda("");
    limpiarFormulario();
    setCargando(false);
  }

  function editarCliente(cliente: Cliente) {
    setClienteEditandoId(cliente.id);

    setFormulario({
      nombre: cliente.nombre,
      telefono: cliente.telefono ?? "",
      frecuencia: cliente.frecuencia,
      ultimaVisita: cliente.ultima_visita ?? "",
      estado: cliente.estado,
      observaciones: cliente.observaciones ?? "",
    });

    setTimeout(() => {
      formularioRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }

  async function eliminarCliente(id: number) {
    const confirmar = confirm("¿Seguro que deseas eliminar este cliente?");
    if (!confirmar) return;

    setCargando(true);

    const { error } = await supabase.from("clientes").delete().eq("id", id);

    if (error) {
      console.error("Error eliminando cliente:", error.message);
      setCargando(false);
      return;
    }

    if (clienteEditandoId === id) limpiarFormulario();

    await cargarClientes();
    setCargando(false);
  }

  function abrirNuevoServicio(cliente: Cliente) {
  setClienteServicio(cliente);
  setServicioModalAbierto(true);
}

  return (
    <GlassModal
      abierto={abierto}
      titulo={clienteEditandoId ? "Editar cliente" : "Nuevo cliente"}
      subtitulo="Gestiona clientes fijos, frecuencia de mantenimiento y futuras visitas."
      onCerrar={onCerrar}
    >
      <form ref={formularioRef} className="space-y-5">
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
            Nombre completo
          </label>
          <input
            type="text"
            value={formulario.nombre}
            onChange={(e) => cambiarCampo("nombre", e.target.value)}
            placeholder="Ej: Sandra González"
            className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#d6a85b]/35"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
            Teléfono / WhatsApp
          </label>
          <input
            type="tel"
            value={formulario.telefono}
            onChange={(e) => cambiarCampo("telefono", e.target.value)}
            placeholder="Ej: 8888-8888"
            className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#d6a85b]/35"
          />
        </div>

        <div className="rounded-[1.6rem] border border-[#d6a85b]/15 bg-[#d6a85b]/[0.06] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f0c779]">
            Ubicación Google Maps
          </p>

          <div className="mt-4 grid h-40 place-items-center rounded-[1.4rem] border border-white/10 bg-black/25 text-center">
            <div>
              <p className="text-3xl">📍</p>
              <p className="mt-2 text-sm font-semibold text-white/75">
                Mapa pendiente de conexión
              </p>
              <p className="mt-1 px-6 text-xs text-white/35">
                Luego se guardará dirección, latitud y longitud.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="mt-4 h-11 w-full rounded-2xl border border-[#d6a85b]/25 bg-[#d6a85b]/10 text-sm font-semibold text-[#f0c779] transition hover:bg-[#d6a85b]/15"
          >
            Seleccionar ubicación
          </button>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
            Frecuencia de mantenimiento
          </label>
          <select
            value={formulario.frecuencia}
            onChange={(e) => cambiarCampo("frecuencia", e.target.value)}
            className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-[#07100b] px-4 text-sm text-white outline-none focus:border-[#d6a85b]/35"
          >
            <option value="Semanal">Semanal</option>
            <option value="Quincenal">Quincenal</option>
            <option value="Mensual">Mensual</option>
            <option value="Ocasional">Ocasional</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
            Última visita
          </label>
          <input
            type="date"
            value={formulario.ultimaVisita}
            onChange={(e) => cambiarCampo("ultimaVisita", e.target.value)}
            className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-[#07100b] px-4 text-sm text-white outline-none focus:border-[#d6a85b]/35"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
            Estado
          </label>
          <select
            value={formulario.estado}
            onChange={(e) => cambiarCampo("estado", e.target.value)}
            className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-[#07100b] px-4 text-sm text-white outline-none focus:border-[#d6a85b]/35"
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
            Observaciones
          </label>
          <textarea
            rows={3}
            value={formulario.observaciones}
            onChange={(e) => cambiarCampo("observaciones", e.target.value)}
            placeholder="Notas importantes del cliente..."
            className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#d6a85b]/35"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={limpiarFormulario}
            className="h-12 rounded-2xl border border-white/10 bg-white/[0.06] text-sm font-semibold text-white/60 transition hover:text-white"
          >
            Limpiar
          </button>

          <button
            type="button"
            onClick={guardarCliente}
            disabled={cargando}
            className="h-12 rounded-2xl border border-[#d6a85b]/30 bg-[#d6a85b]/15 text-sm font-semibold text-[#f0c779] shadow-[0_0_28px_rgba(214,168,91,0.12)] transition hover:bg-[#d6a85b]/20 disabled:opacity-50"
          >
            {cargando ? "Procesando..." : clienteEditandoId ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>

      <div ref={listaRef} className="mt-9">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d6a85b]">
              Clientes registrados
            </p>
            <h3 className="mt-1 text-xl font-semibold text-white">
              {clientesFiltrados.length} de {clientes.length} clientes
            </h3>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
            Buscar cliente
          </label>

          <div className="relative mt-2">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35">
              🔎
            </span>

            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por nombre, teléfono, frecuencia..."
              className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] pl-11 pr-11 text-sm text-white outline-none placeholder:text-white/25 transition focus:border-[#d6a85b]/35"
            />

            {busqueda && (
              <button
                type="button"
                onClick={() => setBusqueda("")}
                className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-xs text-white/45 transition hover:border-[#d6a85b]/30 hover:text-[#f0c779]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {clientesFiltrados.length === 0 && (
            <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-5 text-center">
              <p className="text-sm font-semibold text-white/70">
                No se encontraron clientes
              </p>
              <p className="mt-1 text-xs text-white/35">
                Intenta buscar por otro nombre, teléfono o frecuencia.
              </p>
            </div>
          )}

          {clientesFiltrados.map((cliente) => (
            <article
              key={cliente.id}
              className={`rounded-[1.6rem] border p-4 backdrop-blur-2xl transition duration-500 ${
                clienteMarcadoId === cliente.id
                  ? "border-[#d6a85b]/60 bg-[#d6a85b]/[0.12] shadow-[0_0_35px_rgba(214,168,91,0.18)]"
                  : "border-white/10 bg-white/[0.055]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-base font-semibold text-white">
                    {cliente.nombre}
                  </h4>
                  <p className="mt-1 text-sm text-white/45">
                    {cliente.telefono || "Sin teléfono"}
                  </p>
                </div>

                <span
                  className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${
                    cliente.estado === "Activo"
                      ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-200"
                      : "border-white/10 bg-white/[0.06] text-white/40"
                  }`}
                >
                  {cliente.estado}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/30">
                    Frecuencia
                  </p>
                  <p className="mt-1 text-sm text-white/75">
                    {cliente.frecuencia || "Sin definir"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/30">
                    Última visita
                  </p>
                  <p className="mt-1 text-sm text-white/75">
                    {cliente.ultima_visita || "Pendiente"}
                  </p>
                </div>
              </div>

              {cliente.observaciones && (
                <p className="mt-3 text-sm text-white/40">
                  {cliente.observaciones}
                </p>
              )}

              <div className="mt-4 grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => editarCliente(cliente)}
                  className="h-10 rounded-2xl border border-[#d6a85b]/20 bg-[#d6a85b]/10 text-xs font-semibold text-[#f0c779] transition hover:bg-[#d6a85b]/15"
                >
                  Editar
                </button>

                <button
                  type="button"
                  onClick={() => eliminarCliente(cliente.id)}
                  className="h-10 rounded-2xl border border-red-300/20 bg-red-400/10 text-xs font-semibold text-red-200 transition hover:bg-red-400/15"
                >
                  Eliminar
                </button>
                <button
                type="button"
                onClick={() => {
                  
                  abrirNuevoServicio(cliente);
                }}
                className="h-10 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-300/15"
                >
                Servicio
                </button>
                
              </div>
        
            </article>
            
          ))}
       
        </div>
           
      </div>
            <ServicioModal
        abierto={servicioModalAbierto}
        cliente={clienteServicio}
        onCerrar={() => setServicioModalAbierto(false)}
        />
    </GlassModal>
  );
}