import { NextPage } from 'next';

interface PublicLayoutProps {
    children:React.ReactNode
}

const PublicLayout: NextPage<PublicLayoutProps> = ({children}) => {
  return (
    <div className='h-full dark:bg-[#1F1F1F]'>{children}</div>)
}

export default PublicLayout;