"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Download,
  Search,
  RefreshCw,
  LogOut,
  ExternalLink,
  MessageSquare,
  Clock,
  TrendingUp,
  MapPin,
  CheckCircle,
  Trash2,
  Edit3,
  Smartphone,
  Monitor,
  AlertTriangle,
  X,
  CheckSquare,
  Square,
  Phone,
  User,
  ShieldCheck
} from "lucide-react";
import { Lead } from "@/lib/leads-store";

interface DeleteModalState {
  isOpen: boolean;
  type: "single" | "bulk" | "all";
  targetId?: string;
  targetLabel?: string;
  count?: number;
  keepFrancisco?: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState({
    totalLeads: 0,
    leadsLandingPage: 0,
    leadsToday: 0,
    leadsWeek: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  // Seleção e eliminação
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    isOpen: false,
    type: "single"
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/leads");
      if (res.status === 401) {
        router.push("/dashboard/login");
        return;
      }
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads || []);
        setStats(data.stats || { totalLeads: 0, leadsLandingPage: 0, leadsToday: 0, leadsWeek: 0 });
      }
    } catch (err) {
      console.error("Erro ao carregar leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: Lead["status"]) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setLeads(prev => prev.map(l => (l.id === id ? { ...l, status: newStatus } : l)));
        showTemporaryMessage("Estado atualizado");
      }
    } catch {
      showTemporaryMessage("Erro ao atualizar estado");
    }
  };

  const handleSaveNotes = async (id: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: tempNotes })
      });
      const data = await res.json();
      if (data.success) {
        setLeads(prev => prev.map(l => (l.id === id ? { ...l, notes: tempNotes } : l)));
        setEditingNotesId(null);
        showTemporaryMessage("Notas guardadas com sucesso");
      }
    } catch {
      showTemporaryMessage("Erro ao guardar notas");
    }
  };

  // Abrir modais de eliminação (sem depender de window.confirm nativo)
  const openSingleDelete = (lead: Lead) => {
    const label = lead.name
      ? `${lead.name} (${lead.phone || lead.location || "Lead"})`
      : lead.phone
        ? lead.phone
        : lead.location || lead.id;
    setDeleteModal({
      isOpen: true,
      type: "single",
      targetId: lead.id,
      targetLabel: label
    });
  };

  const openBulkDelete = () => {
    if (selectedIds.length === 0) return;
    setDeleteModal({
      isOpen: true,
      type: "bulk",
      count: selectedIds.length
    });
  };

  const openAllDelete = () => {
    if (leads.length === 0) return;
    setDeleteModal({
      isOpen: true,
      type: "all",
      count: leads.length,
      keepFrancisco: true
    });
  };

  const closeDeleteModal = () => {
    if (isDeleting) return;
    setDeleteModal({ isOpen: false, type: "single" });
  };

  // Executar eliminação confirmada
  const executeDelete = async () => {
    try {
      setIsDeleting(true);

      if (deleteModal.type === "single" && deleteModal.targetId) {
        const res = await fetch(`/api/leads/${deleteModal.targetId}`, { method: "DELETE" });
        const data = await res.json();
        if (data.success) {
          setLeads(prev => prev.filter(l => l.id !== deleteModal.targetId));
          setSelectedIds(prev => prev.filter(id => id !== deleteModal.targetId));
          setStats(prev => ({
            ...prev,
            totalLeads: Math.max(0, prev.totalLeads - 1)
          }));
          showTemporaryMessage("Lead eliminada com sucesso");
        } else {
          showTemporaryMessage(data.error || "Erro ao eliminar lead");
        }
      } else if (deleteModal.type === "bulk") {
        const res = await fetch("/api/leads", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: selectedIds })
        });
        const data = await res.json();
        if (data.success) {
          const removedCount = selectedIds.length;
          const removedSet = new Set(selectedIds);
          setLeads(prev => prev.filter(l => !removedSet.has(l.id)));
          setSelectedIds([]);
          setStats(prev => ({
            ...prev,
            totalLeads: Math.max(0, prev.totalLeads - removedCount)
          }));
          showTemporaryMessage(`${removedCount} leads eliminadas com sucesso`);
        } else {
          showTemporaryMessage(data.error || "Erro ao eliminar leads selecionadas");
        }
      } else if (deleteModal.type === "all") {
        let exceptId: string | undefined = undefined;
        if (deleteModal.keepFrancisco) {
          const francisco = leads.find(l =>
            (l.name && l.name.toLowerCase().includes("picado")) ||
            (l.message && l.message.toLowerCase().includes("picado")) ||
            (l.notes && l.notes.toLowerCase().includes("picado"))
          );
          if (francisco) exceptId = francisco.id;
        }

        const res = await fetch("/api/leads", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ all: true, exceptId })
        });
        const data = await res.json();
        if (data.success) {
          await fetchLeads();
          setSelectedIds([]);
          showTemporaryMessage(
            exceptId
              ? "Todas as leads eliminadas (lead do Francisco Picado mantida)!"
              : "Todas as leads eliminadas com sucesso"
          );
        } else {
          showTemporaryMessage(data.error || "Erro ao limpar leads");
        }
      }
    } catch (err) {
      console.error("Erro na eliminação:", err);
      showTemporaryMessage("Erro de rede ao eliminar");
    } finally {
      setIsDeleting(false);
      setDeleteModal({ isOpen: false, type: "single" });
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/dashboard/login");
  };

  const showTemporaryMessage = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(""), 4000);
  };

  // Seleção de checkboxes
  const toggleSelectLead = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredLeads.length && filteredLeads.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredLeads.map(l => l.id));
    }
  };

  // Filtragem
  const filteredLeads = leads.filter(lead => {
    const matchesStatus = statusFilter === "todos" || lead.status === statusFilter;
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      lead.location?.toLowerCase().includes(q) ||
      lead.role?.toLowerCase().includes(q) ||
      lead.message?.toLowerCase().includes(q) ||
      lead.notes?.toLowerCase().includes(q) ||
      lead.name?.toLowerCase().includes(q) ||
      lead.phone?.toLowerCase().includes(q) ||
      lead.ctaOrigin?.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadgeClass = (status: Lead["status"]) => {
    switch (status) {
      case "Novo":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Em Análise":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Contactado":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "CPCV Assinado":
        return "bg-emerald-100 text-emerald-800 border-emerald-200 font-bold";
      case "Desqualificado":
        return "bg-zinc-100 text-zinc-600 border-zinc-200";
      default:
        return "bg-zinc-100 text-zinc-800 border-zinc-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#1C1917] pb-16">
      
      {/* Top Navbar */}
      <header className="bg-white border-b border-[#E7DFD5] sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#1C1917] text-[#F5EFEB] flex items-center justify-center font-black text-lg shadow-xs shrink-0">
                GF
              </div>
              <div>
                <span className="font-extrabold text-sm tracking-tight block">
                  GRUPO FREITAS
                </span>
                <span className="text-[10px] text-[#78716C] uppercase font-bold tracking-wider">
                  Lead Management • Aveiro
                </span>
              </div>
            </Link>

            <span className="hidden sm:inline-block h-5 w-[1px] bg-[#E7DFD5]" />

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Painel do André
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-medium text-[#78716C] hover:text-[#1C1917] flex items-center gap-1 py-1.5 px-3 rounded-lg hover:bg-[#F5EFEB] transition-colors"
            >
              <span>Ver Landing Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 py-2 px-3 rounded-xl border border-red-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Banner with temporary feedback */}
        {actionMessage && (
          <div className="mb-6 p-3.5 rounded-2xl bg-[#1C1917] text-white text-xs font-semibold flex items-center gap-2.5 shadow-lg animate-in fade-in slide-in-from-top-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="flex-1">{actionMessage}</span>
            <button onClick={() => setActionMessage("")} className="text-zinc-400 hover:text-white p-1">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Header Title & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1917] tracking-tight">
              Registo de Contactos & Leads de Terrenos
            </h1>
            <p className="text-sm text-[#78716C] mt-1">
              Painel de qualificação e gestão direta de terrenos com projeto em Aveiro.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={fetchLeads}
              disabled={loading}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-[#FAF8F5] text-[#44403C] py-2.5 px-3.5 rounded-xl border border-[#E7DFD5] text-xs font-bold shadow-xs transition-colors cursor-pointer"
              title="Atualizar dados"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Atualizar</span>
            </button>

            {leads.length > 0 && (
              <button
                onClick={openAllDelete}
                className="inline-flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-700 py-2.5 px-3.5 rounded-xl border border-red-200 text-xs font-bold transition-colors cursor-pointer"
                title="Eliminar todas as leads"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Limpar Lista</span>
              </button>
            )}

            <a
              href="/api/leads/export"
              download
              className="inline-flex items-center gap-2 bg-[#1C1917] hover:bg-[#292524] text-white py-2.5 px-4 rounded-xl text-xs font-bold shadow-md transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Exportar Leads (CSV)</span>
            </a>
          </div>
        </div>

        {/* Counters & Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="bg-white rounded-2xl p-5 border border-[#E7DFD5] shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#78716C] mb-2">
              <span>Total de Leads</span>
              <MessageSquare className="w-4 h-4 text-[#B45309]" />
            </div>
            <div className="text-3xl font-black text-[#1C1917]">
              {stats.totalLeads}
            </div>
            <div className="text-[11px] text-[#78716C] mt-1">
              Registadas no sistema
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E7DFD5] shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#78716C] mb-2">
              <span>Landing Page</span>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-emerald-700">
              {stats.leadsLandingPage}
            </div>
            <div className="text-[11px] text-[#78716C] mt-1">
              Origem direta do formulário
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E7DFD5] shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#78716C] mb-2">
              <span>Recebidas Hoje</span>
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-3xl font-black text-[#1C1917]">
              {stats.leadsToday}
            </div>
            <div className="text-[11px] text-[#78716C] mt-1">
              Últimas 24 horas
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E7DFD5] shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#78716C] mb-2">
              <span>Últimos 7 Dias</span>
              <TrendingUp className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-3xl font-black text-[#1C1917]">
              {stats.leadsWeek}
            </div>
            <div className="text-[11px] text-[#78716C] mt-1">
              Ritmo semanal de aquisições
            </div>
          </div>

        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-white rounded-2xl p-4 border border-[#E7DFD5] shadow-xs mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#A8A29E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Pesquisar por nome, telefone, freguesia, notas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#E7DFD5] rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#B45309]/50"
            />
          </div>

          {/* Status Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <span className="text-xs font-bold text-[#78716C] mr-1 hidden sm:inline">Filtrar:</span>
            {["todos", "Novo", "Em Análise", "Contactado", "CPCV Assinado", "Desqualificado"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  statusFilter === st
                    ? "bg-[#1C1917] text-white shadow-xs"
                    : "bg-[#F5EFEB] text-[#78716C] hover:bg-[#EBE3D7]"
                }`}
              >
                {st === "todos" ? "Todos" : st}
              </button>
            ))}
          </div>

        </div>

        {/* Bulk Action Bar (aparece quando há leads selecionadas) */}
        {selectedIds.length > 0 && (
          <div className="mb-4 p-3.5 rounded-2xl bg-[#1C1917] text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg animate-in fade-in slide-in-from-top-1">
            <div className="flex items-center gap-2.5 text-xs font-bold">
              <CheckSquare className="w-4 h-4 text-[#B45309]" />
              <span>
                <strong>{selectedIds.length}</strong> {selectedIds.length === 1 ? "lead selecionada" : "leads selecionadas"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={openBulkDelete}
                className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Eliminar Selecionadas</span>
              </button>
              <button
                onClick={() => setSelectedIds([])}
                className="text-xs text-zinc-300 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                Desmarcar
              </button>
            </div>
          </div>
        )}

        {/* Mobile / Tablet Cards View (visível em ecrãs pequenos) */}
        <div className="block lg:hidden space-y-3.5 mb-6">
          {loading ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#E7DFD5] text-[#78716C]">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#B45309]" />
              A carregar contactos...
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#E7DFD5] text-[#78716C] text-sm">
              Nenhuma lead encontrada com os critérios selecionados.
            </div>
          ) : (
            filteredLeads.map((lead) => {
              const isSelected = selectedIds.includes(lead.id);
              const dateObj = new Date(lead.timestamp);
              const dateFormatted = dateObj.toLocaleDateString("pt-PT", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
              });
              const timeFormatted = dateObj.toLocaleTimeString("pt-PT", {
                hour: "2-digit",
                minute: "2-digit"
              });

              return (
                <div
                  key={`card-${lead.id}`}
                  className={`bg-white rounded-2xl p-4 border transition-all ${
                    isSelected ? "border-[#B45309] ring-2 ring-[#B45309]/20" : "border-[#E7DFD5] shadow-xs"
                  }`}
                >
                  {/* Card Header: Checkbox, Name, Status, Delete */}
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#F5EFEB]">
                    <div className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectLead(lead.id)}
                        className="w-4 h-4 mt-0.5 rounded text-[#B45309] focus:ring-[#B45309] cursor-pointer"
                      />
                      <div>
                        <div className="font-extrabold text-[#1C1917] text-sm flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-[#B45309]" />
                          <span>{lead.name || "Lead sem nome"}</span>
                        </div>
                        <div className="text-[11px] text-[#78716C]">
                          {dateFormatted} às {timeFormatted} • {lead.source}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => openSingleDelete(lead)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors cursor-pointer shrink-0"
                      title="Eliminar lead"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-600" />
                      <span>Eliminar</span>
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="pt-3 space-y-2 text-xs">
                    {lead.phone && (
                      <div className="flex items-center justify-between">
                        <span className="text-[#78716C]">Contacto:</span>
                        <div className="flex items-center gap-2">
                          <a href={`tel:${lead.phone.replace(/\s/g, "")}`} className="font-bold text-[#1C1917] hover:underline">
                            {lead.phone}
                          </a>
                          <a
                            href={`https://wa.me/${lead.phone.replace(/\D/g, "").length === 9 ? `351${lead.phone.replace(/\D/g, "")}` : lead.phone.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-bold text-white bg-[#25D366] px-1.5 py-0.5 rounded"
                          >
                            WA
                          </a>
                        </div>
                      </div>
                    )}

                    {lead.location && (
                      <div className="flex items-center justify-between">
                        <span className="text-[#78716C]">Localização:</span>
                        <span className="font-semibold text-[#B45309] flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {lead.location}
                        </span>
                      </div>
                    )}

                    {lead.projectStatus && (
                      <div className="flex items-center justify-between">
                        <span className="text-[#78716C]">Projeto:</span>
                        <span className="font-bold text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {lead.projectStatus} {lead.area ? `• ${lead.area}` : ""}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[#78716C]">Estado:</span>
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead["status"])}
                        className={`text-xs font-semibold rounded-lg px-2 py-1 border focus:outline-none cursor-pointer ${getStatusBadgeClass(
                          lead.status
                        )}`}
                      >
                        <option value="Novo">Novo</option>
                        <option value="Em Análise">Em Análise</option>
                        <option value="Contactado">Contactado</option>
                        <option value="CPCV Assinado">CPCV Assinado</option>
                        <option value="Desqualificado">Desqualificado</option>
                      </select>
                    </div>

                    {lead.message && (
                      <div className="pt-2 text-[11px] text-[#57534E] bg-[#FAF8F5] p-2 rounded-lg border border-[#E7DFD5]">
                        {lead.message}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Leads Table (visível em ecrãs médios e grandes) */}
        <div className="hidden lg:block bg-white rounded-3xl border border-[#E7DFD5] shadow-sm overflow-hidden mb-8">
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#E7DFD5] text-[#78716C] text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === filteredLeads.length && filteredLeads.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded text-[#B45309] focus:ring-[#B45309] cursor-pointer"
                      title="Selecionar todas"
                    />
                  </th>
                  <th className="py-3.5 px-4">Data / Hora</th>
                  <th className="py-3.5 px-4">Origem</th>
                  <th className="py-3.5 px-4">Contacto & Localização</th>
                  <th className="py-3.5 px-4">Projeto / Área</th>
                  <th className="py-3.5 px-4">Mensagem / Detalhe</th>
                  <th className="py-3.5 px-4">Estado</th>
                  <th className="py-3.5 px-4">Notas do André</th>
                  <th className="py-3.5 px-4 text-center sticky right-0 bg-[#FAF8F5] shadow-xs">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#F5EFEB]">
                {loading ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-[#78716C]">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#B45309]" />
                      A carregar contactos...
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-[#78716C]">
                      Nenhuma lead encontrada com os critérios selecionados.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const isSelected = selectedIds.includes(lead.id);
                    const dateObj = new Date(lead.timestamp);
                    const dateFormatted = dateObj.toLocaleDateString("pt-PT", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric"
                    });
                    const timeFormatted = dateObj.toLocaleTimeString("pt-PT", {
                      hour: "2-digit",
                      minute: "2-digit"
                    });

                    return (
                      <tr
                        key={lead.id}
                        className={`transition-colors ${
                          isSelected ? "bg-[#FFF9F2]" : "hover:bg-[#FAF8F5]/80"
                        }`}
                      >
                        
                        {/* Checkbox */}
                        <td className="py-3.5 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectLead(lead.id)}
                            className="w-4 h-4 rounded text-[#B45309] focus:ring-[#B45309] cursor-pointer"
                          />
                        </td>

                        {/* Timestamp */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="font-bold text-[#1C1917]">{dateFormatted}</div>
                          <div className="text-[11px] text-[#78716C]">{timeFormatted}</div>
                        </td>

                        {/* Origem & CTA */}
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-[#1C1917] text-white">
                            {lead.source}
                          </span>
                          <div className="text-xs text-[#57534E] font-medium mt-1">
                            {lead.ctaOrigin}
                          </div>
                          <div className="text-[10px] text-[#A8A29E] flex items-center gap-1 mt-0.5">
                            {lead.device === "Mobile" ? <Smartphone className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
                            <span>{lead.device}</span>
                          </div>
                        </td>

                        {/* Perfil & Local */}
                        <td className="py-3.5 px-4">
                          {lead.name && (
                            <div className="font-extrabold text-[#1C1917] text-sm">{lead.name}</div>
                          )}
                          {lead.phone && (
                            <div className="flex items-center gap-2 mt-0.5">
                              <a href={`tel:${lead.phone.replace(/\s/g, "")}`} className="text-xs font-bold text-[#1C1917] hover:text-[#B45309] underline">
                                {lead.phone}
                              </a>
                              <a
                                href={`https://wa.me/${(() => { const d = lead.phone.replace(/\D/g, ""); return d.length === 9 ? `351${d}` : d; })()}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] font-bold text-white bg-[#25D366] px-1.5 py-0.5 rounded"
                              >
                                WA
                              </a>
                            </div>
                          )}
                          <div className={`text-xs ${lead.name ? "text-[#78716C]" : "font-bold text-[#1C1917]"} mt-0.5`}>
                            {lead.role || "Não especificado"}
                          </div>
                          {lead.location && (
                            <div className="text-xs text-[#B45309] font-semibold flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 shrink-0" />
                              <span>{lead.location}</span>
                            </div>
                          )}
                        </td>

                        {/* Projeto / Área */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {lead.projectStatus ? (
                            <div className="space-y-1">
                              <span className={`inline-block font-bold text-xs px-2 py-1 rounded-md ${
                                lead.projectStatus === "Aprovado"
                                  ? "bg-[#DCFCE7] text-[#15803D]"
                                  : lead.projectStatus === "Não"
                                    ? "bg-[#FEE2E2] text-[#B91C1C]"
                                    : "bg-[#FEF3C7] text-[#B45309]"
                              }`}>
                                {lead.projectStatus}
                              </span>
                              {lead.area && <div className="text-[11px] text-[#78716C]">{lead.area}</div>}
                            </div>
                          ) : lead.askingPrice ? (
                            <span className="font-bold text-[#1C1917] bg-[#F5EFEB] px-2 py-1 rounded-md">
                              {lead.askingPrice}
                            </span>
                          ) : (
                            <span className="text-xs text-[#A8A29E]">—</span>
                          )}
                        </td>

                        {/* Mensagem / Conteúdo */}
                        <td className="py-3.5 px-4 max-w-xs">
                          <p className="text-xs text-[#44403C] line-clamp-2" title={lead.message}>
                            {lead.message}
                          </p>
                        </td>

                        {/* Estado */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead["status"])}
                            className={`text-xs font-semibold rounded-lg px-2.5 py-1.5 border focus:outline-none cursor-pointer ${getStatusBadgeClass(
                              lead.status
                            )}`}
                          >
                            <option value="Novo">Novo</option>
                            <option value="Em Análise">Em Análise</option>
                            <option value="Contactado">Contactado</option>
                            <option value="CPCV Assinado">CPCV Assinado</option>
                            <option value="Desqualificado">Desqualificado</option>
                          </select>
                        </td>

                        {/* Notas do André */}
                        <td className="py-3.5 px-4 min-w-[200px]">
                          {editingNotesId === lead.id ? (
                            <div className="flex flex-col gap-1.5">
                              <textarea
                                value={tempNotes}
                                onChange={(e) => setTempNotes(e.target.value)}
                                className="w-full text-xs p-2 bg-white border border-[#B45309] rounded-lg focus:outline-none"
                                rows={2}
                                placeholder="Adicionar notas..."
                              />
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleSaveNotes(lead.id)}
                                  className="text-[11px] bg-[#1C1917] text-white px-2 py-0.5 rounded font-bold cursor-pointer"
                                >
                                  Gravar
                                </button>
                                <button
                                  onClick={() => setEditingNotesId(null)}
                                  className="text-[11px] text-[#78716C] hover:text-[#1C1917] px-1 cursor-pointer"
                                >
                                  Cancelar
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                setEditingNotesId(lead.id);
                                setTempNotes(lead.notes || "");
                              }}
                              className="group/note cursor-pointer p-1.5 rounded hover:bg-[#F5EFEB] flex items-start justify-between gap-1"
                              title="Clique para editar notas"
                            >
                              <span className="text-xs text-[#57534E] line-clamp-2">
                                {lead.notes ? lead.notes : <em className="text-[#A8A29E]">Sem notas (clique para adicionar)</em>}
                              </span>
                              <Edit3 className="w-3 h-3 text-[#A8A29E] opacity-0 group-hover/note:opacity-100 shrink-0 mt-0.5" />
                            </div>
                          )}
                        </td>

                        {/* Ações (Fixa à direita para ser sempre visível) */}
                        <td className="py-3.5 px-4 text-center whitespace-nowrap sticky right-0 bg-white/95 backdrop-blur-xs shadow-xs">
                          <button
                            onClick={() => openSingleDelete(lead)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors cursor-pointer"
                            title="Eliminar esta lead"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-600" />
                            <span>Eliminar</span>
                          </button>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>

            </table>
          </div>

          {/* Table Footer */}
          <div className="p-4 bg-[#FAF8F5] border-t border-[#E7DFD5] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#78716C]">
            <div>
              A mostrar <strong>{filteredLeads.length}</strong> de <strong>{leads.length}</strong> registos
            </div>
            <div>
              Armazenamento seguro no servidor (`data/leads.json`)
            </div>
          </div>

        </div>

      </main>

      {/* Modal de Confirmação de Eliminação (Moderno, In-App, Seguro) */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E7DFD5] animate-in zoom-in-95">
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-[#1C1917] tracking-tight">
                  {deleteModal.type === "single"
                    ? "Eliminar Registo de Lead"
                    : deleteModal.type === "bulk"
                      ? "Eliminar Leads Selecionadas"
                      : "Limpar Todas as Leads"}
                </h3>
                <p className="text-xs text-[#78716C] mt-0.5">
                  Esta ação é irreversível e removerá os dados do painel.
                </p>
              </div>
            </div>

            <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-[#E7DFD5] mb-5 text-xs text-[#44403C] space-y-2">
              {deleteModal.type === "single" && (
                <p>
                  Tem a certeza que deseja eliminar permanentemente a lead de{" "}
                  <strong className="text-[#1C1917]">{deleteModal.targetLabel}</strong>?
                </p>
              )}

              {deleteModal.type === "bulk" && (
                <p>
                  Tem a certeza que deseja eliminar permanentemente as{" "}
                  <strong className="text-red-700">{deleteModal.count} leads</strong> selecionadas?
                </p>
              )}

              {deleteModal.type === "all" && (
                <div className="space-y-3">
                  <p>
                    Tem a certeza que deseja eliminar todas as{" "}
                    <strong className="text-red-700">{deleteModal.count} leads</strong> do sistema?
                  </p>
                  <label className="flex items-center gap-2.5 pt-2 border-t border-[#E7DFD5] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={deleteModal.keepFrancisco || false}
                      onChange={(e) =>
                        setDeleteModal(prev => ({ ...prev, keepFrancisco: e.target.checked }))
                      }
                      className="w-4 h-4 rounded text-[#B45309] focus:ring-[#B45309]"
                    />
                    <span className="font-bold text-[#1C1917]">
                      Preservar a lead do Francisco Picado
                    </span>
                  </label>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={closeDeleteModal}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-xl border border-[#E7DFD5] text-xs font-bold text-[#57534E] hover:bg-[#F5EFEB] transition-colors cursor-pointer"
              >
                Cancelar
              </button>

              <button
                onClick={executeDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition-all active:scale-98 disabled:opacity-70 cursor-pointer"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>A eliminar...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Confirmar Eliminação</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
