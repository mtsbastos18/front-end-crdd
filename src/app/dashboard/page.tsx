'use client';

import Loading from "@/components/Loading";
import RichTextEditor from "@/components/RichTextEditor";
import { fetchDashboardData } from "@/lib/dashboard.service";
import { ChartBarIcon, UsersIcon, } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    console.log('Rendering DashboardPage');
    const [loading, setLoading] = useState(false);
    const [dashboardData, setData] = useState<{ dispatcherCount: number; processCount: number } | null>(null);

    const stats = [
        { title: "Despachantes Cadastrados", key: 'dispatcherCount', value: "10", icon: UsersIcon, change: "+12%", changeType: "positive" },
        { title: "Total de Processos", key: 'processCount', value: "50", icon: ChartBarIcon, change: "+25%", changeType: "positive" },
    ];

    const handleFetchData = async () => {
        setLoading(true);
        // Implementar lógica para buscar dados do dashboard
        console.log("Buscando dados do dashboard...");
        const response = await fetchDashboardData();

        setData(response.data);
        console.log(response.data);

        console.log(dashboardData);
        setLoading(false);
    }

    const getValue = (key?: string) => {
        console.log(dashboardData)
        if (!dashboardData) return '0';
        switch (key) {
            case 'dispatcherCount':
                return dashboardData.dispatcherCount;
            case 'processCount':
                return dashboardData.processCount;
            default:
                return '0';
        }
    }

    useEffect(() => {
        handleFetchData();
    }, []);

    if (loading) return <Loading />;

    return (
        <div>
            <RichTextEditor />
            <h1 className="text-2xl font-bold mb-6">Painel inicial</h1>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                <p className="text-2xl font-bold mt-1">{getValue(stat.key)}</p>
                            </div>
                            <div className="p-2 rounded-lg bg-primary-50">
                                <stat.icon className="w-6 h-6 text-primary-600" />
                            </div>
                        </div>
                        {/* <p className={`text-sm mt-3 ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                            {stat.change} no último mês
                        </p> */}
                    </div>
                ))}
            </div>

            {/* Charts */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-medium mb-4">Revenue Overview</h2>
                    <BarChart />
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="flex items-start space-x-3">
                                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mt-1">
                                    <span className="text-primary-600 font-medium text-sm">U{item}</span>
                                </div>
                                <div>
                                    <p className="font-medium">User {item} made a purchase</p>
                                    <p className="text-sm text-gray-500">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}
        </div>
    );
}