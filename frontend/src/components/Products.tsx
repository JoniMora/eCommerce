import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit, AiFillPlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { deleteProduct, getProducts } from "../api/products";
import { useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Loader from "./Loader";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Product, Page } from "../Interfaces";



const Products = () => {
    const { ref, inView } = useInView()

    const { data, isLoading, error, isFetchingNextPage, fetchNextPage, hasNextPage} = useInfiniteQuery(
        ['product'],
        getProducts,
        {
            getNextPageParam: (page: Page) => page.meta.next
        }
    )

    useEffect(() => {
        if(inView){
            fetchNextPage()
        }
    },[inView, fetchNextPage])

    const queryClient = useQueryClient();

    const deleteProdMutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Product deleted!")
        },
        onError: () => {
            toast.success("Error!")
        },
    });

    if(deleteProdMutation.isLoading) return <Loader />
    if(error instanceof Error) return <>{toast.error(error.message)}</>

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-4 py-3">
                            Product ID
                        </th>

                        <th scope="col" className="px-4 py-3">
                            Name
                        </th>
                        
                        <th scope="col" className="px-4 py-3">
                            Price
                        </th>
                        
                        <th scope="col" className="px-4 py-3">
                            Stock
                        </th>

                        <th scope="col" className="px-4 py-3 flex items-center justify-center" >
                            Actions
                            <Link to='add'>
                                <AiFillPlusCircle size={22} className="text-green-400 cursor-pointer"/>
                            </Link>
                        </th>
                    </tr>
                </thead>

                {data?.pages.map((page: Page) => ( 
                    <>
                        <tbody key={page.meta.next}>
                            {page.data.map((product: Product) => (
                                <tr className="border-b dark:border-gray-700">
                                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {product.id}
                                    </th>
                                    
                                    <td className="px-4 py-3">
                                        {product.name}
                                    </td>
                                        
                                    <td className="px-4 py-3">
                                        $ {product.price}
                                    </td>

                                    <td className="px-4 py-3">
                                        {product.count_in_stock}
                                    </td>
                                        
                                    <td className="px-4 py-3 flex items-center justify-center gap-4">
                                        <BsFillTrashFill size={22} className="text-red-400 cursor-pointer" 
                                            onClick={() => {
                                                if(product.id !== undefined) {
                                                    deleteProdMutation.mutate(product.id)}
                                            }} 
                                        />
            
                                        <Link to={`edit/${product.id}`}>
                                            <AiFillEdit size={22} className="text-blue-400 cursor-pointer"/>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                        {!isLoading && data?.pages.length === 0 && (
                            <p className="text-xl text-slate-800 dark:text-slate-200">
                                No more results
                            </p>
                        )}
                        {!isLoading &&
                            data?.pages?.length !== undefined &&
                            data.pages.length > 0 &&
                            hasNextPage && (
                                <div ref={ref}>
                                    {isLoading || isFetchingNextPage ? (
                                        <p>Loading...</p>
                                    ) : null}
                                </div>
                            )
                        }
                    </>
                ))}
            </table>
        </div>
    )
}

export default Products