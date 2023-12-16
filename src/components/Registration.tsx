import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
  passwordRepeat: string;
};

export default function Registration() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    localStorage.setItem("registeredUser", JSON.stringify(data));
    navigate("/login");
    console.log(data);
  };

  return (
    <Main>
      <MovieIcons>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="20"
          viewBox="0 0 25 20"
          fill="none"
        >
          <path
            d="M20 0L22.5 5H18.75L16.25 0H13.75L16.25 5H12.5L10 0H7.5L10 5H6.25L3.75 0H2.5C1.11875 0 0.0125 1.11875 0.0125 2.5L0 17.5C0 18.8813 1.11875 20 2.5 20H22.5C23.8813 20 25 18.8813 25 17.5V0H20Z"
            fill="#FC4747"
          />
        </svg>
      </MovieIcons>
      <Div>
        <H2>Sign Up</H2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label hasError={!!errors.email}>
            <Inputs
              type="email"
              placeholder="Email address"
              id="email"
              {...register("email", {
                required: "Can't be empty",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Email is invalid",
                },
              })}
              hasError={!!errors.email}
            />
            {errors.email ? <Error>{errors.email.message}</Error> : null}
          </Label>

          <Label hasError={!!errors.password}>
            <Inputs
              type="password"
              placeholder="Password"
              id="password"
              {...register("password", {
                required: "Can't be empty",
                minLength: {
                  value: 8,
                  message: "must be 8",
                },
                validate: (value) => {
                  return (
                    [/[a-z]/, /[A-Z]/, /[0-9]/].every((pattern) =>
                      pattern.test(value)
                    ) || "must inclute lower, uper, number"
                  );
                },
              })}
              hasError={!!errors.password}
            />
            {errors.password ? <Error>{errors.password.message}</Error> : null}
          </Label>
          <Label hasError={!!errors.passwordRepeat}>
            <Inputs
              type="password"
              placeholder="Repeat Password"
              id="password repeat"
              {...register("passwordRepeat", {
                required: "Can't be empty",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              hasError={!!errors.passwordRepeat}
            />
            {errors.passwordRepeat ? (
              <Error>{errors.passwordRepeat.message}</Error>
            ) : null}
          </Label>
          <Buttonn type="submit">Create an account</Buttonn>
        </Form>
        <Have>
          <p>Alread have an account?</p>
          <Link to="/login" className="link-no-underline">
            <Lo>Login</Lo>
          </Link>
        </Have>
      </Div>
    </Main>
  );
}
const breakpoints = {
  tablet: "768px",
  large: "1440px",
};
const Label: React.ComponentType<
  React.HTMLAttributes<HTMLLabelElement> & LabelProps
> = styled.label<LabelProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: ${(props) =>
    props.hasError ? "1px solid #a92525" : "1px solid #5a698f"};

  height: 4rem;
  color: white;
  width: -webkit-fill-available;
  cursor: pointer;
`;
const Error = styled.p`
  position: relative;
  color: #a92525;
`;
const Div = styled.div`
  padding: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 32.7rem;
  border-radius: 10px;
  margin: 0 auto;
  background: var(--Semi-Dark-Blue, #161d2f);
  @media (min-width: ${breakpoints.tablet}) {
    width: 40rem;
  }
`;

const Inputs: React.FC<InputsProps> = styled.input<InputsProps>`
  background-color: transparent;
  border-style: none;
  font-family: "Outfit";
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  padding-left: 1.6rem;
  color: white;
  /* border-bottom: ${(props) =>
    props.hasError ? "1px solid #a92525" : "1px solid #5a698f"}; */
`;
const Form = styled.form`
  display: flex;
  justify-content: center;
  gap: 1.4rem;
  flex-direction: column;
`;
const Buttonn = styled.button`
  width: 27.9rem;
  height: 4.8rem;
  border-style: none;
  border-radius: 0.6rem;
  background: var(--Red, #fc4747);
  color: white;
  font-family: "Outfit";
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-top: 2.5rem;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: #161d2f;
  }
  @media (min-width: ${breakpoints.tablet}) {
    width: 33.6rem;
  }
`;
const Have = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  font-family: "Outfit";
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-top: 2.4rem;
  color: white;
  margin: 2rem auto;
`;

const Lo = styled.p`
  color: red;
`;

const H2 = styled.h2`
  color: var(--Pure-White, #fff);
  font-family: "Outfit";
  font-size: 32px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: -0.5px;
  margin-bottom: 4rem;
`;
const MovieIcons = styled.div`
  cursor: pointer;
  margin: 0 auto;
`;
const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5.8rem;
  padding-top: 4.8rem;
`;
