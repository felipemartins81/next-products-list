export default async function Greetings() {
  const data = await fetch('http://localhost:4000/api/user');
  const user = await data.json();

  return (
    <div className="flex justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10">
      <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
        {user?.first_name && <>
          Olá <i>{user?.first_name} {user?.last_name}</i>.<br />{' '}
        </>}{' '}
        <strong>Seja bem vindo</strong> a busca de produtos ;){' '}
      </p>
    </div>
  );
}