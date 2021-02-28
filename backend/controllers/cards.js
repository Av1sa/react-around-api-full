const { StatusCodes } = require('http-status-codes');
const Card = require('../models/card');
const { BadInputError } = require('../errors/BadInputError');
const { NotFoundError } = require('../errors/NotFoundError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Card not found');
      }
      res.send(cards);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  if (!(req.params.cardId === req.user._id)) {
    res
      .status(StatusCodes.FORBIDDEN)
      .send({ message: 'Delete your own cards!' });
  } else {
    Card.findByIdAndRemove(req.params.cardId)
      .then((card) => {
        if (!card) {
          throw new NotFoundError('Card not found');
        }
        res.send(card);
      })
      .catch(next);
  }
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new BadInputError('Bad input');
      }
      res.send(card);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card not found');
      }
      res.send(card);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card not found');
      }
      res.send(card);
    })
    .catch(next);
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
