export default function NotFound (){
    return (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-gray-600">404</p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">Страница не найдена </h1>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Извините, мы не смогли найти страницу, которую вы ищете.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a href="/"
                       className="rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Вернуться на главную</a>
                    <a href="#" className="text-sm font-semibold text-gray-900">Обратитесь в службу поддержки</a>
                </div>
            </div>
        </main>
    )
}