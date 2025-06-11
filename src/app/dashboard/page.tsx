import { ChartBarIcon, UsersIcon, CurrencyDollarIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import BarChart from "@/components/BarChart";

export default function DashboardPage() {
    const stats = [
        { title: "Total Users", value: "12,345", icon: UsersIcon, change: "+12%", changeType: "positive" },
        { title: "Total Revenue", value: "$34,546", icon: CurrencyDollarIcon, change: "+8%", changeType: "positive" },
        { title: "Total Products", value: "1,234", icon: ShoppingCartIcon, change: "-3%", changeType: "negative" },
        { title: "Total Visits", value: "45,678", icon: ChartBarIcon, change: "+25%", changeType: "positive" },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                            </div>
                            <div className="p-2 rounded-lg bg-primary-50">
                                <stat.icon className="w-6 h-6 text-primary-600" />
                            </div>
                        </div>
                        <p className={`text-sm mt-3 ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                            {stat.change} from last month
                        </p>
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