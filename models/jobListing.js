import mongoose from 'mongoose'

const jobListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, required: true },
  type: { 
    type: String, 
    enum: ['full-time', 'part-time', 'internship', 'contract'],
    required: true 
  },
  category: { type: String, required: true },
  location: { type: String, required: true },
  datePosted: { type: Date, default: Date.now },
  description: { type: String, required: true },
  tags: [String],
  companyLogo: String
}, { timestamps: true })

export default mongoose.models.JobListing || mongoose.model('JobListing', jobListingSchema)