/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from '@/redux/features/auth/authApi';
import { Link } from 'react-router-dom';
import { Product } from './productTypes';
import { FaEdit, FaTrash, FaStar } from 'react-icons/fa';
import React from 'react';
import Swal from 'sweetalert2';

const ProductManage = () => {
  const [page, setPage] = React.useState(1);
  const limit = 10;
  const [products, setProducts] = React.useState<Product[]>([]);

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    page,
    limit,
  });
  const [deleteProduct] = useDeleteProductMutation();

  React.useEffect(() => {
    refetch();
    if (data) {
      setProducts((data as any)?.result ?? []);
    }
  }, [data]);

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-lg text-red-500">
        Error loading products!
      </p>
    );

  const totalProducts = (data as any)?.total ?? 0;

  const handleDelete = (productId: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This product will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      customClass: {
        confirmButton: 'bg-red-600 text-white',
        cancelButton: 'bg-gray-400 text-white',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== productId),
          );
          await deleteProduct(productId).unwrap();

          Swal.fire({
            title: 'Deleted!',
            text: 'The product has been deleted.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          await refetch();
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to delete the product.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      }
    });
  };

  return (
    <div className="container   mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mt-9 mb-6">
        Product List
      </h1>
      <div className="text-right pr-5 mb-4">
        <Link
          to="/dashboard/products/create"
          className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Add Product
        </Link>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-gray-100">
            <tr className="font-bold text-xs md:text-sm">
              <th className="px-3 py-2 md:px-6 md:py-3 text-gray-700">Image</th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-gray-700">Name</th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-gray-700">Price</th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-gray-700">
                Rating
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-gray-700">
                Category
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-gray-700 hidden md:table-cell">
                Description
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-gray-700">Brand</th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-gray-700">
                Author
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-gray-700">Stock</th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product: Product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 text-xs md:text-sm"
                >
                  <td className="px-3 py-2 md:px-6 md:py-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 text-gray-700">
                    {product.name}
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 text-gray-700">
                    ${product.price}
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 text-gray-700">
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      {product.rating || 'N/A'}
                    </div>
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 text-gray-700">
                    {product.category}
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 text-gray-700 hidden md:table-cell">
                    <div className="truncate max-w-xs">
                      {product.description || 'No description'}
                    </div>
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 text-gray-700">
                    {product.brand}
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 text-gray-700">
                    {product.author}
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 text-gray-700">
                    {product.stock}
                  </td>
                  <td className="px-3 py-2 mt-4 md:px-6 md:py-4 text-gray-700 flex space-x-4">
                    <Link
                      to={`/dashboard/products/edit/${product._id}`}
                      className="text-gray-800 hover:text-blue-800 transition"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id!)}
                      className="text-red-500 hover:text-red-800 transition"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="px-3 py-2 md:px-6 md:py-4 text-center text-gray-500"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition disabled:opacity-50"
        >
          Previous
        </button>
        <span className="self-center px-4 text-lg">
          Page {page} of {Math.ceil(totalProducts / limit)}
        </span>
        <button
          onClick={handleNext}
          disabled={products.length < limit}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductManage;
