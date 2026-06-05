import type { FieldErrors, OrderInput, Product, ProductInput } from "./types";

const bdMobilePattern = /^(?:\+?88)?01[3-9]\d{8}$/;

export function isBangladeshPhone(phone: string) {
  return bdMobilePattern.test(phone.replace(/\s+/g, ""));
}

export function validateProductInput(input: ProductInput): FieldErrors {
  const errors: FieldErrors = {};

  if (!input.name.trim()) {
    errors.name = "Product name is required";
  }

  if (!Number.isFinite(input.price) || input.price <= 0) {
    errors.price = "Price must be greater than 0";
  }

  if (!Number.isFinite(input.deliveryCharge) || input.deliveryCharge < 0) {
    errors.deliveryCharge = "Delivery charge cannot be negative";
  }

  if (!Number.isFinite(input.stock) || input.stock < 0) {
    errors.stock = "Stock cannot be negative";
  }

  if (input.compareAtPrice !== undefined && input.compareAtPrice < input.price) {
    errors.compareAtPrice = "Compare-at price should be greater than price";
  }

  return errors;
}

export function validateOrderInput(
  input: OrderInput,
  product?: Product
): FieldErrors {
  const errors: FieldErrors = {};
  const customer = input.customer;

  if (!customer.name.trim()) {
    errors.name = "Customer name is required";
  }

  if (!isBangladeshPhone(customer.phone)) {
    errors.phone = "Enter a valid Bangladesh mobile number";
  }

  if (!customer.district.trim()) {
    errors.district = "District is required";
  }

  if (!customer.area.trim()) {
    errors.area = "Area is required";
  }

  if (!customer.address.trim()) {
    errors.address = "Full address is required";
  }

  if (!Number.isFinite(input.quantity) || input.quantity < 1) {
    errors.quantity = "Quantity must be at least 1";
  }

  if (!product) {
    errors.product = "Product was not found";
    return errors;
  }

  if (!product.active) {
    errors.product = "This product is not available for ordering";
  }

  if (input.quantity > product.stock) {
    errors.quantity = `Only ${product.stock} item(s) are in stock`;
  }

  const variant = input.variant?.trim();
  if (variant && product.variants.length > 0) {
    const matchingVariant = product.variants.find((item) => item.name === variant);
    if (!matchingVariant) {
      errors.variant = "Selected variant is not available";
    } else if (!errors.quantity && input.quantity > matchingVariant.stock) {
      errors.quantity = `Only ${matchingVariant.stock} item(s) are available for ${variant}`;
    }
  }

  return errors;
}

export function hasFieldErrors(errors: FieldErrors) {
  return Object.keys(errors).length > 0;
}
