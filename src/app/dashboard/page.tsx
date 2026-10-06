"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Download,
  Search,
  Filter,
  RefreshCw,
  LogOut,
  ExternalLink,
  MessageSquare,
  Clock,
  TrendingUp,
  MapPin,
  CheckCircle,
  AlertCircle,
  Trash2,
  Edit3,
  Smartphone,
  Monitor,
  Plus
} from "lucide-react";
import { Lead } from "@/lib/leads-store";

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

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Tem a certeza que deseja eliminar este registo de lead?")) return;
    try {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setLeads(prev => prev.filter(l => l.id !== id));
        setStats(prev => ({ ...prev, totalLeads: prev.totalLeads - 1 }));
        showTemporaryMessage("Lead eliminada");
      }
    } catch {
      showTemporaryMessage("Erro ao eliminar lead");
    }
  };

  const handleCreateTestLead = async () => {
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ctaOrigin: "Teste André",
          role: "Proprietário",
          location: "Oliveirinha",
          askingPrice: "160.000 €",
          message: "Lead de teste gerada pelo painel administrativo",
          notes: "Verificação de fluxo de aquisição de terreno em Oliveirinha"
        })
      });
      const data = await res.json();
      if (data.success) {
        fetchLeads();
        showTemporaryMessage("Lead de teste criada com sucesso!");
      }
    } catch {
      showTemporaryMessage("Erro ao criar lead de teste");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/dashboard/login");
  };

  const showTemporaryMessage = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(""), 3000);
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
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 py-2 px-3 rounded-xl border border-red-200 transition-colors"
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
          <div className="mb-6 p-3 rounded-2xl bg-[#1C1917] text-white text-xs font-semibold flex items-center gap-2 shadow-lg animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Header Title & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1917] tracking-tight">
              Registo de Contactos & Leads de Terrenos
            </h1>
            <p className="text-sm text-[#78716C] mt-1">
              Todos os pedidos iniciados via WhatsApp a partir da landing page com projeto em Aveiro.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={fetchLeads}
              disabled={loading}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-[#FAF8F5] text-[#44403C] py-2.5 px-3.5 rounded-xl border border-[#E7DFD5] text-xs font-bold shadow-xs transition-colors"
              title="Atualizar dados"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Atualizar</span>
            </button>

            <button
              onClick={handleCreateTestLead}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-[#FAF8F5] text-[#B45309] py-2.5 px-3.5 rounded-xl border border-[#E7DFD5] text-xs font-bold shadow-xs transition-colors"
              title="Criar lead de teste"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Simular Lead</span>
            </button>

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
              Origem direta da página
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
        <div className="bg-white rounded-2xl p-4 border border-[#E7DFD5] shadow-xs mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#A8A29E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Pesquisar por localização, perfil, notas..."
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
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors ${
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

        {/* Leads Table */}
        <div className="bg-white rounded-3xl border border-[#E7DFD5] shadow-sm overflow-hidden">
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#E7DFD5] text-[#78716C] text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Data / Hora</th>
                  <th className="py-3.5 px-4">Origem & Gatilho</th>
                  <th className="py-3.5 px-4">Perfil & Localização</th>
                  <th className="py-3.5 px-4">Preço Pretendido</th>
                  <th className="py-3.5 px-4">Mensagem Enviada WhatsApp</th>
                  <th className="py-3.5 px-4">Estado</th>
                  <th className="py-3.5 px-4">Notas do André</th>
                  <th className="py-3.5 px-4 text-right">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#F5EFEB]">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-[#78716C]">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#B45309]" />
                      A carregar contactos...
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-[#78716C]">
                      Nenhuma lead encontrada com os critérios selecionados.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
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
                      <tr key={lead.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                        
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
                          <div className="font-bold text-[#1C1917]">
                            {lead.role || "Não especificado"}
                          </div>
                          <div className="text-xs text-[#B45309] font-semibold flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span>{lead.location || "Região Aveiro"}</span>
                          </div>
                        </td>

                        {/* Valor Pretendido */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {lead.askingPrice ? (
                            <span className="font-bold text-[#1C1917] bg-[#F5EFEB] px-2 py-1 rounded-md">
                              {lead.askingPrice}
                            </span>
                          ) : (
                            <span className="text-xs text-[#A8A29E]">Sob Consulta</span>
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
                                  className="text-[11px] bg-[#1C1917] text-white px-2 py-0.5 rounded font-bold"
                                >
                                  Gravar
                                </button>
                                <button
                                  onClick={() => setEditingNotesId(null)}
                                  className="text-[11px] text-[#78716C] hover:text-[#1C1917] px-1"
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

                        {/* Ações */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1.5 text-[#A8A29E] hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                            title="Eliminar Lead"
                          >
                            <Trash2 className="w-4 h-4" />
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
              Armazenamento seguro em ficheiro JSON no servidor (`data/leads.json`)
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
