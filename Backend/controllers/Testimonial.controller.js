import { Testimonial } from "../models/index.js";
 
// GET ALL — Public
export const getAllTestimonials = async (req, res) => {
  try {
    const filter = {};
    if (req.query.featured) filter.featured = true;
 
    const testimonials = await Testimonial.find(filter).sort({ order: 1 });
    res.status(200).json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
 
// CREATE — Admin only
export const createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
 
// UPDATE — Admin only
export const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    res.status(200).json({ success: true, data: testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
 
// DELETE — Admin only
export const deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Testimonial delete ho gaya!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};