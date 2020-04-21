const Store = require('../models/store');
const User = require('../models/user');

exports.getAllStores = (req, res, next) => {
  Store.find({})
    .then(stores => res.status(200).json({stores: stores}))
    .catch(error => res.status(500).json(error));
};

exports.createStore = async (req, res, next) => {
  // ensures that at least name and email, are provided
  if (!(req.body.name)) 
    return res.status(401).json({message: 'Please provide a valid name'});
  else if (!(req.body.email))
    return res.status(401).json({message: 'Please provide a valid email'});

  // retrieve the user from res.locals set in userId middleware
  const user = res.locals.user;

  // ensure that the user is of admin type else return 
  if (user.userType !== 'ADMIN') {
    return res.status(401).json({message: 'Only ADMIN users can create stores'});
  }

  // create the store
  const store = new Store({
    userId: user._id,
    name: req.body.name,
    email: req.body.email,
    description: req.body.description || '',
    address: req.body.address || {
      street: '',
      state: 1, 
      city: '', 
      zipcode: '', 
      country: ''
    },
    category: req.body.category || '',
    logo: req.body.logo || req.body.name.toLowerCase(),
    phone: req.body.phone || '',
    banner: req.body.banner || req.body.name.toUpperCase()
  });

  // save the store and return it
  store.save()
    .then(() => res.status(201).json({
      message: 'Store successfully created',
      store: store 
    })).catch(error => res.status(500).json(error));
};

exports.getStore = (req, res, next) => {
  res.status(200).json(res.locals.store);
}