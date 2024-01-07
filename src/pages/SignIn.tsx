import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import {RootStackParamList} from '../../App';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInScreenProps) {
  const onSubmit = useCallback(() => {
    Alert.alert('aa');
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = useCallback(
    e => {
      setEmail(e);
    },
    [email],
  );

  const onChangePassword = useCallback(
    e => {
      setPassword(e);
    },
    [password],
  );

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const canGoNext = email && password;

  return (
    <View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.textInput}
          placeholder="이메일을 입력해주세요"
          onChangeText={onChangeEmail}
          value={email}
          importantForAccessibility="yes"
          autoComplete="email"
          textContentType="emailAddress"
          clearButtonMode="while-editing"
          onSubmitEditing={() => {
            passwordRef?.current?.focus();
          }}
          ref={emailRef}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.textInput}
          placeholder="비밀번호 입력해주세요"
          onChangeText={onChangePassword}
          secureTextEntry
          value={password}
          importantForAccessibility="yes"
          autoComplete="password"
          textContentType="password"
          ref={passwordRef}
          onSubmitEditing={onSubmit}
        />
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          onPress={onSubmit}
          style={
            !canGoNext
              ? styles.loginButton
              : [styles.loginButton, styles.loginButtonActive]
          }
          disabled={!canGoNext}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </Pressable>
        <Pressable onPress={toSignUp} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>회원가입</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    padding: 20,
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  buttonZone: {
    alignItems: 'center',
  },
  textInput: {
    padding: 5,
    borderBottomWidth: 1,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
});

export default SignIn;
