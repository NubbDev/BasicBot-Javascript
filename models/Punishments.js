const reqString = {
    type: String,
    required: true,
}

const Punishments = ({
    _id: reqString,
    reason: reqString,
    staffId: reqString,
    expires: Date,
    type: {
        type: String,
        enum: ['ban', 'mute']
    }
  },
  {
    timestamps: true,
  }
)
module.exports = Punishments;