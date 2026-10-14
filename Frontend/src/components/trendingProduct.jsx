import ProductCard from "./productCard";

export default function TrendingProduct(props){
    const mockProducts = [
        {
            productID: "trend-1",
            productName: "MacBook Pro M3",
            images: ["https://picsum.photos/id/1/200/300"],
            description: "High-performance laptop with Apple M3 chip.",
            price: 150000,
            labelledPrice: 180000
        },
        {
            productID: "trend-2",
            productName: "iPad Air",
            images: ["https://picsum.photos/id/2/200/300"],
            description: "Lightweight and powerful tablet.",
            price: 80000,
            labelledPrice: 95000
        },
        {
            productID: "trend-3",
            productName: "iPhone 15 Pro",
            images: ["https://picsum.photos/id/3/200/300"],
            description: "Titanium design, A17 Pro chip.",
            price: 250000,
            labelledPrice: 280000
        },
        {
            productID: "trend-4",
            productName: "Apple Watch Series 9",
            images: ["https://picsum.photos/id/4/200/300"],
            description: "Smarter, brighter, mightier.",
            price: 60000,
            labelledPrice: 70000
        }
    ];

    return(
        <div className="bg-slate-50 py-10 px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-extrabold text-slate-800 mb-8 tracking-tight border-b border-slate-200 pb-3">
                    Trending Products
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {mockProducts.map((p) => (
                        <ProductCard key={p.productID} product={p} />
                    ))}
                </div>
            </div>
        </div>
    )
}