import { StyleSheet } from 'react-native';

import colors from '../../common/colors';
import fonts from '../../common/fonts';
import spacing from '../../common/spacings';

const styles = StyleSheet.create({
  loginContainer: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
    paddingHorizontal: spacing.paddingHorizontal,
  },
  title: {
    fontFamily: fonts.titleFontBold,
    fontSize: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  welcome: {
    fontFamily: fonts.textFont,
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.Greenprimary,
    borderRadius: 20,
    width: '100%',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  buttonText: {
    color: '#ffffff',
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    marginBottom: 25,
    marginVertical: 10,
    flexDirection: 'row',
    width: '100%',
  },
  input: {
    paddingLeft: 15,
    fontFamily: fonts.smallTextFont,
    fontSize: 18,
  },

  textReference: {
    fontFamily: fonts.textFont,
    color: '#ccc',
  },
});

export default styles;
