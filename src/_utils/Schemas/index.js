import * as Yup from 'yup';
import resizeImage from '_utils/resizeImage';

export const regExMobNo = /[6-9]\d{9}$/;
export const regExPincode = /^[1-9][0-9]{5}$/;
// export const regExPassword = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

export const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'application/pdf', 'image/png'];

const CheckImage = files => {
  const returnStatus = files.map(async item => {
    return new Promise((resolve, reject) => {
      console.log(item);
      const reader = new FileReader();
      reader.readAsDataURL(item);
      reader.onload = async () => {
        const imageSize = new Image();
        imageSize.src = reader.result;
        imageSize.onload = async () => {
          console.log('Height', imageSize.height, 'Width', imageSize.width);
          if (imageSize.height === 500 && imageSize.width === 300) {
            resolve(true);
          } else if (imageSize.height > 500 && imageSize.width > 300) {
            const getNewImage = await resizeImage(item, 300, 500);
            console.log('GETNEw Iamge', getNewImage.size, item.size / 1024 / 1024);
            const size = getNewImage.size / 1024 / 1024;
            console.log('size***', size);
            if (size > 2) {
              console.log('insfgdc');
              reject(item.name);
            } else {
              resolve(true);
            }
          } else {
            console.log('ImageSize', false);
            reject(item.name);
          }
        };
      };
    });
  });

  return returnStatus;
};

Yup.addMethod(Yup.string, 'phone', function() {
  return this.test('phone', 'Phone number is not valid', value => regExMobNo.test(value));
});

Yup.addMethod(Yup.string, 'pincode', function() {
  return this.test('pincode', 'Enter valid Pincode', value => regExPincode.test(value));
});

Yup.addMethod(Yup.string, 'password', function() {
  return this.test(
    'password',
    'Password must be between 6 to 20 characters with at least one numeric digit, one uppercase and one lowercase letter',
    value => passRegEx.test(value),
  );
});

const checkFileType = (files, supportedFormats) => {
  console.log(files);

  files = files.filter(result => typeof result != 'string');

  console.log(files.length);
  if (files.length === 0) {
    return true;
  }
  let valid = true;
  const formatReq = supportedFormats || SUPPORTED_FORMATS;
  if (files && files.length > 0) {
    files.map(file => {
      if (file.type && !formatReq.includes(file.type)) {
        valid = false;
      } else if (!file.type && !file.url) valid = false;
      return '';
    });
  }
  return valid;
};

export const UserProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  gender: Yup.string().oneOf(['male', 'female']),
  // email: Yup.string()
  //   .email('Invalid email')
  //   .required('Required'),
  // phoneNo: Yup.string()
  //   .required('Required!')
  //   .phone('Phone number is not valid'),
});

export const UserAddressSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  addressType: Yup.string().required('Required'),
  pincode: Yup.string()
    .required('Required')
    .pincode(),
  phoneNo: Yup.string()
    .required('Required!')
    .phone('Phone number is not valid'),
  houseNo: Yup.string().required('Required'),
  street: Yup.string().required('Required'),
  landmark: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
});

export const CurrentPasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Please enter current password'),
  // .password(),
});

export const NewPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .password(
      'Password must be between 6 to 20 characters with at least one numeric digit, one uppercase and one lowercase letter',
    )
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Required'),
});

export const updatePwdEmailSchema = NewPasswordSchema.concat(
  Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
  }),
);

export const AccountDetailsSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  mobileNo: Yup.string()
    .required('Required!')
    .phone('Phone number is not valid'),
  loginEmail: Yup.string().email('Invalid email'),
  loginPassword: Yup.string(),
});

export const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  email: Yup.string()
    .email('Please provide valid email')
    .required('Please enter email'),
  // email: Yup.string()
  //   .email('Invalid email')
  //   .required('Required'),
  password: Yup.string()
    .required('Please enter password')
    .password(
      'Password must be between 6 to 20 characters with at least one numeric digit, one uppercase and one lowercase letter',
    )
    .required('Required'),
  cpassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  remember: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
});

export const LoginSchema = Yup.object().shape({
  // email: Yup.string()
  //   .email('Invalid email')
  //   .required('Required'),
  // password: Yup.string().required('Required'),
  email: Yup.string()
    .required('Please enter email')
    .email('Please enter valid email'),
  password: Yup.string().required('Please enter password'),
  // otp: Yup.string().required('Required')
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

export const CheckoutShipAddrSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  addressTwo: Yup.string(),
  addressOne: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  pincode: Yup.string()
    .required('Required')
    .pincode(),
  phoneNo: Yup.string()
    .required('Required!')
    .phone('Phone number is not valid'),
});

export const presUploadSchema = Yup.object().shape({
  files: Yup.array()
    .nullable()
    // .test('emptyArray', 'A file is required', a => a && a.length !== 0)
    // .required('A file is required')
    .test('fileFormat', 'Unsupported Format. Required: jpeg/ jpg/ png/ pdf', checkFileType),
});

const prodsPresValidSchema = Yup.object().shape({
  productId: Yup.string().required('Product id requires'),
  prescriptions: Yup.array()
    .of(Yup.number())
    .required('Select prescription(s)'),
});

export const prodPresSchema = Yup.object().shape({
  products: Yup.array().of(prodsPresValidSchema),
});

export const couponSchema = Yup.object().shape({
  coupen: Yup.string().required('Required'),
});

export const presSchemaIds = Yup.object().shape({
  prescriptions: Yup.array()
    .of(Yup.number())
    .required('Select prescription(s)'),
});

export const checkoutShippingBillingSchema = Yup.object().shape({
  shippingAddressId: Yup.number()
    .nullable()
    .required('Required'),
  billingAddressId: Yup.number()
    .nullable()
    .required('Required'),
});

export const reviewSchema = Yup.object().shape({
  text: Yup.string(),
  title: Yup.string(),
  rating: Yup.number()
    .min(1, 'Required')
    .required('Required'),
});

export const ListingSchema = Yup.object().shape({
  title: Yup.string().required('Please enter title'),
  full_address: Yup.string().required('Please select address'),
  description: Yup.string().nullable(),
  tags: Yup.string(),
  type: Yup.string().required('Please select type'),
  category_id: Yup.number().required('Please select category'),
  expired: Yup.boolean().oneOf([true, false], 'Please check expired or not'),
  expiredate: Yup.date()
    .nullable()
    .when('expired', {
      is: true,
      then: Yup.date().required('Please select expired date'),
    }),
  // phone: Yup.string().required('Please enter this field'),
  // .phone('Phone number is not valid'),
  image: Yup.array()
    .required('Please upload an image')
    // .test('fileFormat', 'Unsupported Format. Required:(.jpg,.png,.jpeg)', checkFileType),
    .test('fileFormat', 'Unsupported Format. Required:(.jpg,.png,.jpeg)', checkFileType),
  // .test('fileSize', 'File too large,Please select file of width and height', async function(
  //   files,
  // ) {
  //   console.log(files);
  //   files = files.filter(result => typeof result != 'string');
  //   if (files && files.length > 0) {
  //     return new Promise((resolve, reject) => {
  //       Promise.all(CheckImage(files))
  //         .then(result => {
  //           console.log(result);
  //           resolve(true);
  //         })
  //         .catch(err => {
  //           console.log(err);
  //           reject(
  //             this.createError({
  //               message: `Please select image of width 300 and height 500 for image name ${err}`,
  //             }),
  //           );
  //         });
  //     });
  //   } else {
  //     console.log(files.length);

  //     return new Promise((resolve, reject) => {
  //       resolve(true);
  //     });
  //   }
  // }),
  description: Yup.string().required('Please enter description'),
  // .test('fileSize', 'File too large,Please select file wiht width and height', async function(
  //   files,
  // ) {
  //   console.log(files);
  //   return new Promise((resolve, reject) => {
  //     Promise.all(CheckImage(files))
  //       .then(result => {
  //         console.log(result);
  //         resolve(true);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         reject(
  //           this.createError({
  //             message: `Please select file proper width and height for image name ${err}`,
  //           }),
  //         );
  //       });
  //   });
  // }),
});

export const ProfileSchema = Yup.object().shape({
  //firstName: Yup.string().required('Please enter firstname'),
  //lastName: Yup.string().required('Please enter lastname'),
  email: Yup.string()
    .required('Please enter email')
    .email('Please enter valid email'),
  // phone: Yup.string().nullable(),
  // .test('phone', 'Phone number is not valid', value => {
  //   console.log(value);
  //   if (!value || value == 'null') {
  //     return true;
  //   } else {
  //     if (regExMobNo.test(value)) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //     // return this.test('phone', 'Phone number is not valid', value => regExMobNo.test(value));
  //   }
  // }),
  volunteer: Yup.boolean(),
});
export const ChangePasswordSchema = Yup.object().shape({
  old_password: Yup.string().required('Please enter old password'),
  new_password: Yup.string()
    .password()
    .required('Please enter new password'),
  confirm_password: Yup.string().oneOf([Yup.ref('new_password'), 'null'], 'Password must match'),
});

export const HomepagesearchSchema = Yup.object().shape({
  category_id: Yup.number().required('Please select category'),
  address: Yup.string().required('Please select address'),
});

export const ContactSchema = Yup.object().shape({
  name: Yup.string().required('Please the name'),
  messagae: Yup.string().required('Please enter Message'),
  usermail: Yup.string()
    .required('Please enter email')
    .email('Please enter valid email'),
  phone: Yup.string().required('Phone number is required'),
});

export const BranchSchema = Yup.object().shape({
  fullName: Yup.string().required('Please enter fullname'),
  email: Yup.string()
    .required('Please enter email')
    .email('Please enter valid email'),
  phone: Yup.string().required('Please enter phone no '),
  hospitalId: Yup.number(),
  address: Yup.string().required('Please enter address'),
});

export const PatientCreationSchema = Yup.object().shape({
  name: Yup.string().required('Please the name'),
  messagae: Yup.string().required('Please enter Message'),
  usermail: Yup.string()
    .required('Please enter email')
    .email('Please enter valid email'),
  phone: Yup.string().required('Phone number is required'),
});
