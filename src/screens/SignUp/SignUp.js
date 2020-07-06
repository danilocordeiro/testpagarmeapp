import React, {useRef, useState} from 'react';
import {ScrollView, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {signUpRequest} from '../../store/modules/auth/actions';
import Background from '../../components/Background/Background';
import {colors} from '../../utils/colors';
import {
  Container,
  FormInput,
  Form,
  SubmitButton,
  SignLinkText,
  SignLink,
} from './styles';

const formSchema = Yup.object().shape({
  email: Yup.string().trim().email('Invalid e-mail').required('Required'),
  name: Yup.string().trim().required('Required'),
  password: Yup.string().trim().required('Required'),
  password_confirmation: Yup.string()
    .trim()
    .required('Required')
    .test('password-match', 'The passwords must be e equal', function (value) {
      return this.parent.password === value;
    }),
});

export default function SignUp({navigation}) {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [type, setType] = useState('client');
  const loading = useSelector(state => state.auth.loading);

  const initialValues = {
    email: '',
    password: '',
    name: '',
    password_confirmation: '',
  };
  const onSubmit = values => {
    const {email, name, password, password_confirmation} = values;
    dispatch(
      signUpRequest({email, name, password, password_confirmation, type}),
    );
  };

  return (
    <Background>
      <ScrollView>
        <Container>
          <Formik initialValues={initialValues} validationSchema={formSchema}>
            {({values, handleChange, setFieldTouched, touched, errors}) => (
              <Form>
                <FormInput
                  icon="person-outline"
                  autoCorrect
                  autoCapitalize="none"
                  placeholder="Your name"
                  name="name"
                  returnKeyType="next"
                  value={values.nome}
                  onBlur={() => setFieldTouched('name')}
                  onChangeText={handleChange('name')}
                  onSubmitEditing={() => emailRef.current.focus()}
                />
                {touched.name && errors.name && (
                  <Text
                    style={{
                      fontSize: 12,
                      marginBottom: 10,
                      color: colors.red,
                    }}>
                    {errors.name}
                  </Text>
                )}
                <FormInput
                  icon="mail-outline"
                  keyboardType="email-address"
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder="Your email"
                  name="email"
                  ref={emailRef}
                  returnKeyType="next"
                  value={values.email}
                  onBlur={() => setFieldTouched('email')}
                  onChangeText={handleChange('email')}
                  onSubmitEditing={() => passwordRef.current.focus()}
                />
                {touched.email && errors.email && (
                  <Text
                    style={{
                      fontSize: 12,
                      marginBottom: 10,
                      color: colors.red,
                    }}>
                    {errors.email}
                  </Text>
                )}
                <FormInput
                  icon="lock-outline"
                  secureTextEntry
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder="Your password"
                  name="password"
                  ref={passwordRef}
                  returnKeyType="next"
                  value={values.password}
                  onBlur={() => setFieldTouched('password')}
                  onChangeText={handleChange('password')}
                  onSubmitEditing={() =>
                    passwordConfirmationRef.current.focus()
                  }
                />
                {touched.password && errors.password && (
                  <Text
                    style={{
                      fontSize: 12,
                      marginBottom: 10,
                      color: colors.red,
                    }}>
                    {errors.password}
                  </Text>
                )}
                <FormInput
                  icon="lock-outline"
                  secureTextEntry
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder="Your password confirmation"
                  name="password_confirmation"
                  ref={passwordConfirmationRef}
                  returnKeyType="send"
                  value={values.password_confirmation}
                  onBlur={() => setFieldTouched('password_confirmation')}
                  onChangeText={handleChange('password_confirmation')}
                  onSubmitEditing={() => onSubmit(values)}
                />
                {touched.password_confirmation && errors.password_confirmation && (
                  <Text
                    style={{
                      fontSize: 12,
                      marginBottom: 10,
                      color: colors.red,
                    }}>
                    {errors.password_confirmation}
                  </Text>
                )}

                <SubmitButton
                  loading={loading}
                  onPress={() => onSubmit(values)}>
                  Sign Up
                </SubmitButton>
              </Form>
            )}
          </Formik>
          <SignLink onPress={() => navigation.navigate('SignIn')}>
            <SignLinkText>Already registered? Enter here</SignLinkText>
          </SignLink>
        </Container>
      </ScrollView>
    </Background>
  );
}
