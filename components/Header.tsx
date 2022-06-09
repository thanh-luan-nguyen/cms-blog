import Link from 'next/link'
import { useEffect, useState } from 'react';
import { getCategories } from '../services';
import { Category } from '../types';
const categories = [
  { name: 'Cat 1', slug: 'Slug 1' },
  { name: 'Cat 2', slug: 'Slug 2' },
  { name: 'Cat 3', slug: 'Slug 3' },
]

const Header = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <div className='container mx-auto px-10 mb-8 '>
      <div className='border-b w-full inline-block border-blue-400 py-8 '>
        {/* thừa: block */}
        <div className='md:float-left'>
          <Link href='/'>
            <span className='cursor-pointer font-bold text-4xl text-white'>
              GraphCMS
            </span>
          </Link>
        </div>

        <div className='hidden md:contents'>
          {categories.map((category, index) => (
            <Link href={`/category/${category.slug}`} key={index}>
              {/* thừa align-middle */}
              <span className='md:float-right mt-2 text-white ml-4 font-semibold cursor-pointer '>
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header
