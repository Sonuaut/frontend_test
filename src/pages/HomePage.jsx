import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import { getAllProducts } from "../services/product";
import { useParams } from "react-router-dom";
import { getCategories } from "../services/category";

const HomePage = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category,setCategory]=useState();
    console.log("category id :",categoryId)

    const fetchCategories = async () => {
        setLoading(true);
        try {
            console.log("in fetch categories:",categoryId)
            const res = await getCategories();
            console.log("response:",res)
            if (res.status) {
                
                const categoryFound = res.data.find((item) => String(item.id) === String(categoryId));
                console.log("category found",categoryFound)
                setCategory(categoryFound);
            } else {
                setError(res.message || "Failed to fetch categories");
            }
        } catch (err) {
            setError(err.message || "Failed to fetch categories");
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            let res;
            if (categoryId && categoryId !== "all") {
                res = await getAllProducts(1, 10, { categoryId: categoryId });
            } else {
                res = await getAllProducts();
            }
            
            if (res.status) {
                setProducts(res.data.data);
            } else {
                setError(res.message || "Failed to fetch products");
            }
        } catch (err) {
            setError(err.message || "Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        // fetchCategories();
        fetchProducts();
    }, [categoryId]);

    if (error) return `Error! ${error}`;
    return (
        <>
            <section className="py-10">
                <div className="container">
                    {/* <h1 className="text-4xl mb-5">{categoryId=="all"?"ALL":category.name}</h1> */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {loading ? (
                            <Spinner loading={loading} />
                        ) : (
                            products.map((product) => (
                                <ProductCard product={product} key={product.id} />
                            ))
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
