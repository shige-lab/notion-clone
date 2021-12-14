import { auth } from './firebase';

const SignUp = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    interface FormData {
      email: { value: string };
      password: { value: string };
    }
    
    const { email, password } = event.target as typeof event.target & FormData;
    auth.createUserWithEmailAndPassword(email.value, password.value);
    email.value = '';
    password.value = '';
  };

return (
    <div>
      <h1>ユーザ登録</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input name="email" type="email" placeholder="email" />
        </div>
        <div>
          <label>パスワード</label>
          <input name="password" type="password" />
        </div>
        <div>
          <button>登録</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;