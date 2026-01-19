import { InstagramLogoIcon, LinkedinLogoIcon, FacebookLogoIcon } from "@phosphor-icons/react"

function Footer() {
    // Captura o ano atual dinamicamente
    const data = new Date().getFullYear()

    return (
        <>
            <div className="flex justify-center bg-indigo-900 text-white">
                <div className="container flex flex-col items-center py-4">
                    <p className='text-xl font-bold'>
                        Blog Pessoal Generation | Copyright: {data}
                    </p>
                    <p className='text-lg'>Acesse nossas redes sociais</p>
                    <div className='flex gap-2'>
                        <a href="https://linkedin.com/in/itlia" target="blank">
                            <LinkedinLogoIcon size={48} className="hover:text-blue-500" weight="bold" />
                        </a>
                        <a href="https://instagram.com/itlia" target="blank">
                            <InstagramLogoIcon size={48} className="hover:text-pink-500" weight="bold" />
                        </a>
                        <a href="https://facebook.com/itlia" target="blank">
                            <FacebookLogoIcon size={48} className="hover:text-blue-700" weight="bold" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer