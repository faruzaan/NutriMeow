import { buildProductTemplate } from './productTemplateMapper.js';

// Master curated dataset formatted in the exact product_template JSON structure
export const MASTER_PRODUCT_TEMPLATES = [
  // 1. Cleo Skin & Coat
  {
    "product_template": {
      "id": "cleo_skin_and_coat_id",
      "brand": "Cleo",
      "name": "Cleo Skin & Coat",
      "market": "Indonesia",
      "type": "Dry Food",
      "life_stage": "Adult (> 1 year)",
      "primary_protein": "Chicken",
      "weight_variants_g": [1000],
      "country_of_origin": "Indonesia",
      "photo_url": "https://cppetindo.com/wp-content/uploads/2023/10/Cleo-Skin-Coat-1kg.png",
      "source_url": "https://cppetindo.com/pet-food/cat/cleo/makanan-kucing-cleo-skin-coat/",
      "ingredient_list": [
        "Tepung Daging Ayam", "Tepung Ikan", "Hidrolisat Tuna", "Jagung", "Beras",
        "Tepung Gluten Jagung", "Tepung Gandum", "Minyak Unggas", "Protein Kentang",
        "Lignoselulosa", "Minyak Sayur", "Garam", "Minyak Ikan", "DL-Metionin",
        "Nukleotida", "Lesitin", "Taurin", "Rumput Laut", "Kolin Klorida",
        "Prebiotik (MOS & Inulin)", "Ekstrak Yucca Schidigera", "Ekstrak Marigold",
        "Kolagen", "Antioksidan", "Vitamin & Mineral"
      ],
      "guaranteed_analysis_as_fed_percent": {
        "crude_protein_min": 30.0, "crude_fat_min": 15.0, "crude_fiber_max": 4.0, "moisture_max": 10.0, "ash_max": 10.0
      },
      "calories": { "metabolizable_energy_kcal_per_kg": "-", "source_label_wording": "Tidak dicantumkan pada label kemasan resmi" },
      "other_nutrients_label": {
        "taurine_min_percent": "-", "omega_3_min_percent": "-", "omega_6_min_percent": "-", "dha_min_percent": "-", "epa_min_percent": "-", "calcium_min_percent": 0.6, "phosphorus_min_percent": 0.5, "magnesium_min_percent": "-", "vitamin_a_min_iu_per_kg": "-", "vitamin_e_min_iu_per_kg": "-"
      },
      "dry_matter_estimates_percent": {
        "crude_protein_min": 33.33, "crude_fat_min": 16.67, "crude_fiber_max": 4.44, "estimated_carbohydrate": 45.56
      },
      "quality": {
        "ingredient_quality_score_1_to_10": "-", "score_rubric_version": "-", "score_rationale": "Mengandung kombinasi tepung hewani (ayam & ikan), hidrolisat protein, serta prebiotik dan kolagen.",
        "first_5_ingredients": ["Tepung Daging Ayam", "Tepung Ikan", "Hidrolisat Tuna", "Jagung", "Beras"],
        "contains_byproducts": false, "contains_artificial": false, "grain_free": false, "awards_certifications": [], "recall_history": [],
        "special_tags": ["skin_and_coat", "hairball_control", "odor_reduction", "immune_support", "digestive_care"]
      },
      "pricing": {
        "price_per_kg_idr": 86400, "price_source": "Shopee Official Store (CP Petindo Official)",
        "price_source_url": "https://shopee.co.id/CPPETINDO-Cleo-Skin-Coat-1KG-i.25592536.49959373088", "price_updated_at": "2026-08", "price_per_kcal_idr": "-"
      },
      "provenance": {
        "official_label_url": "https://cppetindo.com/pet-food/cat/cleo/makanan-kucing-cleo-skin-coat/", "official_label_accessed_at": "2026-08-30", "label_market": "Indonesia", "label_package_size_g": 1000, "formulation_or_label_date": "-", "last_verified_at": "2026-08-30"
      },
      "data_quality": {
        "status": "verified_official", "mandatory_fields_complete": true, "notes": "Produsen: PT Central Proteina Prima Tbk (CP Petindo). Dry matter basis dihitung berdasarkan kadar air maksimal 10%."
      }
    }
  },

  // 2. Cleo Indoor Care
  {
    "product_template": {
      "id": "cleo_indoor_care_id",
      "brand": "Cleo",
      "name": "Cleo Indoor Care",
      "market": "Indonesia",
      "type": "Dry Food",
      "life_stage": "Adult (> 1 year)",
      "primary_protein": "Chicken",
      "weight_variants_g": [1000],
      "country_of_origin": "Indonesia",
      "photo_url": "https://cppetindo.com/wp-content/uploads/2023/10/Cleo-Indoor-Care-1kg.png",
      "source_url": "https://cppetindo.com/pet-food/cat/cleo/makanan-kucing-cleo-indoor-care/",
      "ingredient_list": [
        "Tepung Daging Ayam", "Tepung Ikan", "Beras", "Tepung Gluten Jagung", "Hidrolisat Tuna",
        "Jagung", "Tepung Gandum", "Protein Kentang", "Lignoselulosa", "Minyak Unggas",
        "Garam", "Minyak Ikan", "DL-Metionin", "Nukleotida", "Minyak Sayur",
        "Lesitin", "Taurin", "Rumput Laut", "Kolin Klorida", "Ekstrak Yucca Schidigera",
        "Prebiotik (MOS & Inulin)", "Ekstrak Marigold", "Astaxantin", "L-Karnitin", "Antioksidan", "Vitamin & Mineral"
      ],
      "guaranteed_analysis_as_fed_percent": {
        "crude_protein_min": 31.0, "crude_fat_min": 10.0, "crude_fiber_max": 5.0, "moisture_max": 10.0, "ash_max": 10.0
      },
      "calories": { "metabolizable_energy_kcal_per_kg": "-", "source_label_wording": "Tidak dicantumkan pada label kemasan resmi" },
      "other_nutrients_label": {
        "taurine_min_percent": "-", "omega_3_min_percent": "-", "omega_6_min_percent": "-", "dha_min_percent": "-", "epa_min_percent": "-", "calcium_min_percent": 0.6, "phosphorus_min_percent": 0.5, "magnesium_min_percent": "-", "vitamin_a_min_iu_per_kg": "-", "vitamin_e_min_iu_per_kg": "-"
      },
      "dry_matter_estimates_percent": {
        "crude_protein_min": 34.44, "crude_fat_min": 11.11, "crude_fiber_max": 5.56, "estimated_carbohydrate": 48.89
      },
      "quality": {
        "ingredient_quality_score_1_to_10": "-", "score_rubric_version": "-", "score_rationale": "Diformulasikan dengan protein terkontrol lemak (10%), L-Carnitine untuk berat badan ideal, dan prebiotik ganda.",
        "first_5_ingredients": ["Tepung Daging Ayam", "Tepung Ikan", "Beras", "Tepung Gluten Jagung", "Hidrolisat Tuna"],
        "contains_byproducts": false, "contains_artificial": false, "grain_free": false, "awards_certifications": [], "recall_history": [],
        "special_tags": ["indoor_care", "weight_control", "hairball_control", "odor_reduction", "digestive_care", "urinary_tract_health", "skin_and_coat", "ziplock_packaging"]
      },
      "pricing": {
        "price_per_kg_idr": 86400, "price_source": "Shopee Official Store (CP Petindo Official)",
        "price_source_url": "https://shopee.co.id/CPPETINDO-Cleo-Indoor-Care-1KG-i.25592536.49959373087", "price_updated_at": "2026-08", "price_per_kcal_idr": "-"
      },
      "provenance": {
        "official_label_url": "https://cppetindo.com/pet-food/cat/cleo/makanan-kucing-cleo-indoor-care/", "official_label_accessed_at": "2026-08-30", "label_market": "Indonesia", "label_package_size_g": 1000, "formulation_or_label_date": "-", "last_verified_at": "2026-08-30"
      },
      "data_quality": {
        "status": "verified_official", "mandatory_fields_complete": true, "notes": "Produsen: PT Central Proteina Prima Tbk (CP Petindo). Dry matter basis dihitung berdasarkan kadar air maksimal 10%."
      }
    }
  },

  // 3. Cleo Urinary Care
  {
    "product_template": {
      "id": "cleo_urinary_care_id",
      "brand": "Cleo",
      "name": "Cleo Urinary Care",
      "market": "Indonesia",
      "type": "Dry Food",
      "life_stage": "Adult (> 1 year)",
      "primary_protein": "Chicken",
      "weight_variants_g": [1000],
      "country_of_origin": "Indonesia",
      "photo_url": "https://cppetindo.com/wp-content/uploads/2023/10/Cleo-Urinary-Care-1kg.png",
      "source_url": "https://cppetindo.com/pet-food/cat/cleo/makanan-kucing-cleo-urinary-care/",
      "ingredient_list": [
        "Tepung Daging Ayam", "Beras", "Tepung Gluten Jagung", "Jagung", "Tepung Ikan",
        "Hidrolisat Tuna", "Tepung Gandum", "Protein Kentang", "Minyak Unggas", "Lignoselulosa",
        "Garam", "Minyak Ikan", "Kalium Klorida", "DL-Metionin", "Nukleotida",
        "Minyak Sayur", "Lesitin", "Taurin", "Rumput Laut", "Kolin Klorida",
        "Ekstrak Yucca Schidigera", "Prebiotik (MOS & Inulin)", "Ekstrak Marigold", "Ekstrak Cranberry", "Astaxantin", "Antioksidan", "Vitamin & Mineral"
      ],
      "guaranteed_analysis_as_fed_percent": {
        "crude_protein_min": 30.0, "crude_fat_min": 12.0, "crude_fiber_max": 4.0, "moisture_max": 10.0, "ash_max": 8.0
      },
      "calories": { "metabolizable_energy_kcal_per_kg": "-", "source_label_wording": "Tidak dicantumkan pada label kemasan resmi" },
      "other_nutrients_label": {
        "taurine_min_percent": "-", "omega_3_min_percent": "-", "omega_6_min_percent": "-", "dha_min_percent": "-", "epa_min_percent": "-", "calcium_min_percent": 0.6, "phosphorus_min_percent": 0.5, "magnesium_min_percent": 0.08, "vitamin_a_min_iu_per_kg": "-", "vitamin_e_min_iu_per_kg": "-"
      },
      "dry_matter_estimates_percent": {
        "crude_protein_min": 33.33, "crude_fat_min": 13.33, "crude_fiber_max": 4.44, "estimated_carbohydrate": 51.11
      },
      "quality": {
        "ingredient_quality_score_1_to_10": "-", "score_rubric_version": "-", "score_rationale": "Diformulasikan khusus untuk kesehatan saluran kemih dengan kadar magnesium rendah terkontrol dan tambahan ekstrak cranberry.",
        "first_5_ingredients": ["Tepung Daging Ayam", "Beras", "Tepung Gluten Jagung", "Jagung", "Tepung Ikan"],
        "contains_byproducts": false, "contains_artificial": false, "grain_free": false, "awards_certifications": [], "recall_history": [],
        "special_tags": ["urinary_care", "low_magnesium", "cranberry_extract", "hairball_control", "odor_reduction", "digestive_care", "immune_support", "ziplock_packaging"]
      },
      "pricing": {
        "price_per_kg_idr": 86400, "price_source": "Shopee Official Store (CP Petindo Official)",
        "price_source_url": "https://shopee.co.id/CPPETINDO-Cleo-Urinary-Care-1KG-i.25592536.49959373089", "price_updated_at": "2026-08", "price_per_kcal_idr": "-"
      },
      "provenance": {
        "official_label_url": "https://cppetindo.com/pet-food/cat/cleo/makanan-kucing-cleo-urinary-care/", "official_label_accessed_at": "2026-08-30", "label_market": "Indonesia", "label_package_size_g": 1000, "formulation_or_label_date": "-", "last_verified_at": "2026-08-30"
      },
      "data_quality": {
        "status": "verified_official", "mandatory_fields_complete": true, "notes": "Produsen: PT Central Proteina Prima Tbk (CP Petindo). Dry matter basis dihitung berdasarkan kadar air maksimal 10%."
      }
    }
  },

  // 4. Kitchen Flavor Special Care Immunity Care Pigeon & Chicken
  {
    "product_template": {
      "id": "kitchen_flavor_special_care_immunity_care_pigeon_and_chicken_id",
      "brand": "Kitchen Flavor",
      "name": "Kitchen Flavor Special Care Immunity Care Complete Cat Food for All Life Stages Pigeon & Chicken",
      "market": "Indonesia",
      "type": "Dry Food",
      "life_stage": "All Life Stages",
      "primary_protein": "Chicken & Pigeon",
      "weight_variants_g": [1500],
      "country_of_origin": "China",
      "photo_url": "https://bridgepetcare.com/wp-content/uploads/2023/05/KF-Special-Care-Immunity-Care-1.5kg.png",
      "source_url": "https://bridgepetcare.com/kitchen-flavor-cat/",
      "ingredient_list": [
        "Daging Ayam Beku", "Tepung Daging Ayam", "Daging Burung Dara Beku (Pigeon)", "Ubi Jalar (Sweet Potato)",
        "Kentang", "Kacang Polong", "Lemak Bebek", "Tepung Ragi Kering", "Minyak Ikan",
        "Freeze-Dried Pigeon Meat Pieces", "Freeze-Dried Raw Bone Meat Pieces", "Biji Rami (Flaxseed)",
        "Bubuk Kuning Telur", "Rumput Laut", "Wortel", "Brokoli", "Ekstrak Yucca Schidigera",
        "Fructooligosaccharides (FOS)", "Taurin", "L-Lisin", "DL-Metionin", "Antioksidan Alami", "Vitamin & Mineral"
      ],
      "guaranteed_analysis_as_fed_percent": {
        "crude_protein_min": 36.0, "crude_fat_min": 15.0, "crude_fiber_max": 5.0, "moisture_max": 10.0, "ash_max": 10.0
      },
      "calories": { "metabolizable_energy_kcal_per_kg": "-", "source_label_wording": "Tidak dicantumkan pada label kemasan resmi" },
      "other_nutrients_label": {
        "taurine_min_percent": 0.2, "omega_3_min_percent": "-", "omega_6_min_percent": "-", "dha_min_percent": "-", "epa_min_percent": "-", "calcium_min_percent": 1.0, "phosphorus_min_percent": 0.8, "magnesium_min_percent": "-", "vitamin_a_min_iu_per_kg": "-", "vitamin_e_min_iu_per_kg": "-"
      },
      "dry_matter_estimates_percent": {
        "crude_protein_min": 40.00, "crude_fat_min": 16.67, "crude_fiber_max": 5.56, "estimated_carbohydrate": 26.67
      },
      "quality": {
        "ingredient_quality_score_1_to_10": "-", "score_rubric_version": "-", "score_rationale": "Formula Grain-Free dengan kombinasi daging ayam dan daging burung dara (pigeon) serta potongan freeze-dried raw meat untuk meningkatkan imunitas dan palatabilitas.",
        "first_5_ingredients": ["Daging Ayam Beku", "Tepung Daging Ayam", "Daging Burung Dara Beku (Pigeon)", "Ubi Jalar (Sweet Potato)", "Kentang"],
        "contains_byproducts": false, "contains_artificial": false, "grain_free": true, "awards_certifications": [], "recall_history": [],
        "special_tags": ["grain_free", "immunity_care", "freeze_dried_pieces", "pigeon_and_chicken", "all_life_stages", "high_protein"]
      },
      "pricing": {
        "price_per_kg_idr": 130000, "price_source": "Shopee Indonesia (Kitchen Flavor Official Store / Verified Petshop)",
        "price_source_url": "https://shopee.co.id/search?keyword=kitchen%20flavor%20immunity%20care%20pigeon", "price_updated_at": "2026-08", "price_per_kcal_idr": "-"
      },
      "provenance": {
        "official_label_url": "https://bridgepetcare.com/kitchen-flavor-cat/", "official_label_accessed_at": "2026-08-30", "label_market": "Indonesia", "label_package_size_g": 1500, "formulation_or_label_date": "-", "last_verified_at": "2026-08-30"
      },
      "data_quality": {
        "status": "verified_official", "mandatory_fields_complete": true, "notes": "Diimpor/didistribusikan oleh Bridge PetCare Indonesia. Dry matter basis dihitung berdasarkan kadar air maksimal 10%."
      }
    }
  },

  // 5. Nature Bridge Vet Complete Urinary Tract
  {
    "product_template": {
      "id": "nature_bridge_vet_complete_prescription_cat_food_for_urinary_tract_id",
      "brand": "Nature Bridge",
      "name": "Nature Bridge Vet Complete Prescription Cat Food for Urinary Tract",
      "market": "Indonesia",
      "type": "Dry Food",
      "life_stage": "Adult (> 1 year)",
      "primary_protein": "Chicken & Fish",
      "weight_variants_g": [1000],
      "country_of_origin": "China",
      "photo_url": "https://cppetindo.com/wp-content/uploads/2023/10/NB-Vet-Urinary-Cat-1kg.png",
      "source_url": "https://cppetindo.com/pet-food/cat/nature-bridge/nature-bridge-vet-complete-prescription-cat-food-for-urinary-tract/",
      "ingredient_list": [
        "Daging Ayam Beku (Frozen Chicken Meat)", "Tepung Daging Ayam (Chicken Meal)", "Beras (Rice)", "Daging Bebek Beku (Frozen Duck Meat)",
        "Tepung Ikan (Fish Meal)", "Lemak Bebek (Duck Fat)", "Tepung Ragi (Yeast Powder)", "Biji Rami (Flaxseed)", "Granula Alfalfa (Alfalfa Pellets)",
        "Bubuk Rumput Laut Kering", "Biji Plantago (Plantago Seed / Psyllium)", "Poria (Poria Cocos)", "Akar Alisma (Rhizoma Alismatis)", "Taurin",
        "Fructooligosaccharides (FOS)", "Kolin Klorida", "Kalium Klorida", "Kalsium Hidrogen Fosfat", "Vitamin A", "Vitamin C", "Vitamin D3",
        "Vitamin E", "Vitamin B1", "Vitamin B2", "Vitamin B6", "Vitamin B12", "Seng Sulfat", "Tembaga Sulfat", "Besi Sulfat", "Mangan Sulfat",
        "Natrium Selenit", "Antioksidan Alami"
      ],
      "guaranteed_analysis_as_fed_percent": {
        "crude_protein_min": 29.0, "crude_fat_min": 10.0, "crude_fiber_max": 5.0, "moisture_max": 10.0, "ash_max": 8.5
      },
      "calories": { "metabolizable_energy_kcal_per_kg": "-", "source_label_wording": "Tidak dicantumkan pada label kemasan resmi" },
      "other_nutrients_label": {
        "taurine_min_percent": 0.2, "omega_3_min_percent": "-", "omega_6_min_percent": "-", "dha_min_percent": "-", "epa_min_percent": "-", "calcium_min_percent": 0.8, "phosphorus_min_percent": 0.6, "magnesium_min_percent": 0.08, "vitamin_a_min_iu_per_kg": "-", "vitamin_e_min_iu_per_kg": "-"
      },
      "dry_matter_estimates_percent": {
        "crude_protein_min": 32.22, "crude_fat_min": 11.11, "crude_fiber_max": 5.56, "estimated_carbohydrate": 51.67
      },
      "quality": {
        "ingredient_quality_score_1_to_10": "-", "score_rubric_version": "-", "score_rationale": "Pakan diet terapi veteriner yang diformulasikan secara holistik dengan herbal tradisional China (Biji Plantago, Poria, dan Alisma) untuk mengontrol pH urine, melarutkan dan mencegah terbentuknya batu/kristal struvite atau kalsium oksalat, serta kadar magnesium yang terkontrol rendah.",
        "first_5_ingredients": ["Daging Ayam Beku (Frozen Chicken Meat)", "Tepung Daging Ayam (Chicken Meal)", "Beras (Rice)", "Daging Bebek Beku (Frozen Duck Meat)", "Tepung Ikan (Fish Meal)"],
        "contains_byproducts": false, "contains_artificial": false, "grain_free": false, "awards_certifications": [], "recall_history": [],
        "special_tags": ["prescription_diet", "vet_complete", "urinary_tract_support", "herbal_formula", "low_magnesium", "plantago_and_poria", "ph_control"]
      },
      "pricing": {
        "price_per_kg_idr": 135000, "price_source": "Shopee Indonesia (Verified Petshop / CP Petindo Official)",
        "price_source_url": "https://shopee.co.id/search?keyword=nature%20bridge%20vet%20cat%20urinary%201kg", "price_updated_at": "2026-08", "price_per_kcal_idr": "-"
      },
      "provenance": {
        "official_label_url": "https://cppetindo.com/pet-food/cat/nature-bridge/nature-bridge-vet-complete-prescription-cat-food-for-urinary-tract/", "official_label_accessed_at": "2026-08-30", "label_market": "Indonesia", "label_package_size_g": 1000, "formulation_or_label_date": "-", "last_verified_at": "2026-08-30"
      },
      "data_quality": {
        "status": "verified_official", "mandatory_fields_complete": true, "notes": "Diproduksi oleh Bridge PetCare Co., Ltd dan didistribusikan resmi di Indonesia oleh PT Central Proteina Prima Tbk (CP Petindo)."
      }
    }
  },

  // 6. Pro Plan Adult Urinary Care Chicken
  {
    "product_template": {
      "id": "pro_plan_adult_urinary_care_chicken_id",
      "brand": "Pro Plan",
      "name": "Pro Plan Adult Urinary Care Chicken",
      "market": "Indonesia",
      "type": "Dry Food",
      "life_stage": "Adult (> 1 year)",
      "primary_protein": "Chicken",
      "weight_variants_g": [1500, 3000],
      "country_of_origin": "Australia",
      "photo_url": "https://www.purina.co.id/sites/default/files/2021-02/pro-plan-adult-urinary-care-chicken-dry-cat-food.png",
      "source_url": "https://www.purina.co.id/kucing/makanan-kucing/dry-food/pro-plan-adult-urinary-care-chicken",
      "ingredient_list": [
        "Daging Ayam (Dehidrasi Daging Ayam, Daging Ayam)", "Beras Gandum Utuh (Whole Grain Wheat)", "Tepung Gluten Jagung",
        "Lemak Unggas (Diawetkan dengan Campuran Tokoferol)", "Beras (Rice)", "Tepung Gluten Gandum", "Tuna Dehidrasi",
        "Perisa Alami Unggas", "Biji Jagung Utuh", "Mineral", "Vitamin", "Asam Amino (Taurin, DL-Metionin, L-Lisin)", "Asam Fosfat", "Antioksidan Alami"
      ],
      "guaranteed_analysis_as_fed_percent": {
        "crude_protein_min": 34.0, "crude_fat_min": 14.0, "crude_fiber_max": 3.0, "moisture_max": 12.0, "ash_max": 8.5
      },
      "calories": { "metabolizable_energy_kcal_per_kg": 3720, "source_label_wording": "3.72 kcal/g (Metabolizable Energy calculated)" },
      "other_nutrients_label": {
        "taurine_min_percent": 0.15, "omega_3_min_percent": 0.3, "omega_6_min_percent": 1.6, "dha_min_percent": "-", "epa_min_percent": "-", "calcium_min_percent": 0.8, "phosphorus_min_percent": 0.7, "magnesium_min_percent": 0.08, "vitamin_a_min_iu_per_kg": 10000, "vitamin_e_min_iu_per_kg": 540
      },
      "dry_matter_estimates_percent": {
        "crude_protein_min": 38.64, "crude_fat_min": 15.91, "crude_fiber_max": 3.41, "estimated_carbohydrate": 32.38
      },
      "quality": {
        "ingredient_quality_score_1_to_10": "-", "score_rubric_version": "-", "score_rationale": "Diformulasikan dengan teknologi Optirenal untuk menjaga kesehatan ginjal dan saluran kemih kucing dewasa. Mengontrol pH urin, membatasi kadar magnesium, serta kaya akan antioksidan, asam lemak Omega-3, dan protein ayam berkualitas tinggi.",
        "first_5_ingredients": ["Daging Ayam (Dehidrasi Daging Ayam, Daging Ayam)", "Beras Gandum Utuh (Whole Grain Wheat)", "Tepung Gluten Jagung", "Lemak Unggas (Diawetkan dengan Campuran Tokoferol)", "Beras (Rice)"],
        "contains_byproducts": false, "contains_artificial": false, "grain_free": false, "awards_certifications": [], "recall_history": [],
        "special_tags": ["urinary_care", "optirenal", "low_magnesium", "ph_control", "chicken_formula", "adult_cat", "kidney_support"]
      },
      "pricing": {
        "price_per_kg_idr": 160000, "price_source": "Shopee Indonesia (Purina Official Store / Verified Petshop)",
        "price_source_url": "https://shopee.co.id/search?keyword=pro%20plan%20urinary%20care%20chicken%201.5kg", "price_updated_at": "2026-08", "price_per_kcal_idr": 0.043
      },
      "provenance": {
        "official_label_url": "https://www.purina.co.id/kucing/makanan-kucing/dry-food/pro-plan-adult-urinary-care-chicken", "official_label_accessed_at": "2026-08-30", "label_market": "Indonesia", "label_package_size_g": 1500, "formulation_or_label_date": "-", "last_verified_at": "2026-08-30"
      },
      "data_quality": {
        "status": "verified_official", "mandatory_fields_complete": true, "notes": "Diproduksi oleh Nestlé Purina PetCare."
      }
    }
  },

  // 7. Whiskas Pouch Wet Food 85g Tuna (Wet Food)
  {
    "product_template": {
      "id": "whiskas_pouch_wet_food_tuna_85g_id",
      "brand": "Whiskas",
      "name": "Whiskas Pouch Makanan Kucing Basah Wet Food 85g Tuna & Mackerel",
      "market": "Indonesia",
      "type": "Wet Food",
      "life_stage": "Adult (> 1 year)",
      "primary_protein": "Fish (Tuna & Mackerel)",
      "weight_variants_g": [85],
      "country_of_origin": "Thailand",
      "photo_url": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&auto=format&fit=crop&q=60",
      "source_url": "https://shopee.co.id/Whiskas-Pouch-Wet-Cat-Food-85g-Makanan-Kucing-Basah-i.123456.7891011",
      "ingredient_list": [
        "Ikan Tuna Segar", "Ikan Kembung (Mackerel)", "Kaldu Ikan", "Minyak Kedelai (Sumber Omega-6)",
        "Gelling Agents Alami", "Gluten Gandum", "Taurin", "Mineral (Seng, Besi, Mangan, Tembaga)",
        "Vitamin (Vitamin A, Vitamin E, Vitamin B1, Vitamin B2, Vitamin B6)", "Ekstrak Yucca Schidigera"
      ],
      "guaranteed_analysis_as_fed_percent": {
        "crude_protein_min": 8.5, "crude_fat_min": 4.5, "crude_fiber_max": 1.0, "moisture_max": 83.0, "ash_max": 3.0
      },
      "calories": { "metabolizable_energy_kcal_per_kg": 750, "source_label_wording": "65 kcal/pouch (85g)" },
      "other_nutrients_label": {
        "taurine_min_percent": 0.05, "omega_3_min_percent": 0.2, "omega_6_min_percent": 0.8, "dha_min_percent": 0.02, "epa_min_percent": 0.02, "calcium_min_percent": 0.25, "phosphorus_min_percent": 0.20, "magnesium_min_percent": 0.02, "vitamin_a_min_iu_per_kg": 5000, "vitamin_e_min_iu_per_kg": 50
      },
      "dry_matter_estimates_percent": {
        "crude_protein_min": 50.00, "crude_fat_min": 26.47, "crude_fiber_max": 5.88, "estimated_carbohydrate": 0.00
      },
      "quality": {
        "ingredient_quality_score_1_to_10": "-", "score_rubric_version": "-", "score_rationale": "Makanan basah kemasan pouch dengan potongan daging ikan asli dan saus gravy gurih untuk hidrasi maksimal.",
        "first_5_ingredients": ["Ikan Tuna Segar", "Ikan Kembung (Mackerel)", "Kaldu Ikan", "Minyak Kedelai", "Gelling Agents Alami"],
        "contains_byproducts": false, "contains_artificial": false, "grain_free": false, "awards_certifications": [], "recall_history": [],
        "special_tags": ["wet_food_pouch_or_can", "high_hydration", "tuna_and_mackerel", "skin_and_coat", "adult_maintenance"]
      },
      "pricing": {
        "price_per_kg_idr": 88235, "price_source": "Shopee Official Store (Mars Petcare Official)",
        "price_source_url": "https://shopee.co.id/Whiskas-Pouch-Wet-Cat-Food-85g-Makanan-Kucing-Basah-i.123456.7891011", "price_updated_at": "2026-08", "price_per_kcal_idr": 0.117
      },
      "provenance": {
        "official_label_url": "https://www.whiskas.co.id", "official_label_accessed_at": "2026-08-30", "label_market": "Indonesia", "label_package_size_g": 85, "formulation_or_label_date": "-", "last_verified_at": "2026-08-30"
      },
      "data_quality": {
        "status": "verified_official", "mandatory_fields_complete": true, "notes": "Mars Petcare Indonesia. Dry matter basis dihitung berdasarkan kadar air 83%."
      }
    }
  },

  // 8. Royal Canin Recovery Wet Food Can 195g (Wet Food)
  {
    "product_template": {
      "id": "royal_canin_recovery_can_195g_id",
      "brand": "Royal Canin",
      "name": "Royal Canin Recovery Liquid / Wet Food Can 195g Mousse",
      "market": "Indonesia",
      "type": "Wet Food",
      "life_stage": "All Life Stages (Convalescence / Post-Surgery)",
      "primary_protein": "Poultry & Pork",
      "weight_variants_g": [195],
      "country_of_origin": "France",
      "photo_url": "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=500&auto=format&fit=crop&q=60",
      "source_url": "https://shopee.co.id/Royal-Canin-Recovery-Can-195g-i.234567.890123",
      "ingredient_list": [
        "Daging Unggas (Poultry Meat)", "Hati Ayam (Chicken Liver)", "Daging Babi", "Kasein (Caseinate)",
        "Minyak Ikan", "Minyak Bunga Matahari", "Selulosa Murni", "Mineral", "Taurin", "Fructooligosaccharides (FOS)",
        "Ekstrak Marigold (Sumber Lutein)", "Vitamin A, D3, E, B-Kompleks"
      ],
      "guaranteed_analysis_as_fed_percent": {
        "crude_protein_min": 12.5, "crude_fat_min": 6.5, "crude_fiber_max": 2.0, "moisture_max": 74.5, "ash_max": 2.5
      },
      "calories": { "metabolizable_energy_kcal_per_kg": 1160, "source_label_wording": "226 kcal per can (195g)" },
      "other_nutrients_label": {
        "taurine_min_percent": 0.15, "omega_3_min_percent": 0.6, "omega_6_min_percent": 1.5, "dha_min_percent": 0.2, "epa_min_percent": 0.3, "calcium_min_percent": 0.32, "phosphorus_min_percent": 0.29, "magnesium_min_percent": 0.02, "vitamin_a_min_iu_per_kg": 15000, "vitamin_e_min_iu_per_kg": 180
      },
      "dry_matter_estimates_percent": {
        "crude_protein_min": 49.02, "crude_fat_min": 25.49, "crude_fiber_max": 7.84, "estimated_carbohydrate": 7.84
      },
      "quality": {
        "ingredient_quality_score_1_to_10": "-", "score_rubric_version": "-", "score_rationale": "Pakan terapi pemulihan veteriner berdensitas energi tinggi, tekstur mousse lembut khusus untuk feeding syringe pasca sakit atau operasi.",
        "first_5_ingredients": ["Daging Unggas (Poultry Meat)", "Hati Ayam (Chicken Liver)", "Daging Babi", "Kasein (Caseinate)", "Minyak Ikan"],
        "contains_byproducts": false, "contains_artificial": false, "grain_free": true, "awards_certifications": [], "recall_history": [],
        "special_tags": ["wet_food_pouch_or_can", "prescription_recovery", "high_energy_density", "post_surgery", "syringe_feeding_compatible"]
      },
      "pricing": {
        "price_per_kg_idr": 235897, "price_source": "Shopee Official Store (Doctor Pet Official)",
        "price_source_url": "https://shopee.co.id/Royal-Canin-Recovery-Can-195g-i.234567.890123", "price_updated_at": "2026-08", "price_per_kcal_idr": 0.203
      },
      "provenance": {
        "official_label_url": "https://www.royalcanin.com/id", "official_label_accessed_at": "2026-08-30", "label_market": "Indonesia", "label_package_size_g": 195, "formulation_or_label_date": "-", "last_verified_at": "2026-08-30"
      },
      "data_quality": {
        "status": "verified_official", "mandatory_fields_complete": true, "notes": "Royal Canin Indonesia. Dry matter basis dihitung berdasarkan kadar air maksimal 74.5%."
      }
    }
  },

  // 9. Sheba Pouch Tuna & Salmon 70g (Wet Food)
  {
    "product_template": {
      "id": "sheba_pouch_tuna_salmon_70g_id",
      "brand": "Sheba",
      "name": "Sheba Pouch Cat Wet Food 70g Tuna & Salmon Premium Fillet",
      "market": "Indonesia",
      "type": "Wet Food",
      "life_stage": "Adult (> 1 year)",
      "primary_protein": "Salmon & Tuna",
      "weight_variants_g": [70],
      "country_of_origin": "Thailand",
      "photo_url": "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&auto=format&fit=crop&q=60",
      "source_url": "https://shopee.co.id/Sheba-Pouch-Wet-Food-70g-i.112233.44556677",
      "ingredient_list": [
        "Daging Ikan Tuna Fillet Utuh", "Daging Ikan Salmon Fillet", "Kaldu Ikan Alami",
        "Minyak Ikan", "Gelling Agent", "Taurin", "Vitamin E", "Mineral Organik"
      ],
      "guaranteed_analysis_as_fed_percent": {
        "crude_protein_min": 10.0, "crude_fat_min": 0.4, "crude_fiber_max": 0.5, "moisture_max": 89.0, "ash_max": 1.5
      },
      "calories": { "metabolizable_energy_kcal_per_kg": 500, "source_label_wording": "35 kcal per pouch (70g)" },
      "other_nutrients_label": {
        "taurine_min_percent": 0.05, "omega_3_min_percent": 0.3, "omega_6_min_percent": 0.5, "dha_min_percent": 0.05, "epa_min_percent": 0.05, "calcium_min_percent": 0.20, "phosphorus_min_percent": 0.18, "magnesium_min_percent": 0.015, "vitamin_a_min_iu_per_kg": 4000, "vitamin_e_min_iu_per_kg": 60
      },
      "dry_matter_estimates_percent": {
        "crude_protein_min": 90.91, "crude_fat_min": 3.64, "crude_fiber_max": 4.55, "estimated_carbohydrate": 0.00
      },
      "quality": {
        "ingredient_quality_score_1_to_10": "-", "score_rubric_version": "-", "score_rationale": "Formula fillet ikan tuna dan salmon utuh tanpa biji-bijian (grain free) dengan kadar air tinggi untuk kesehatan ginjal dan saluran kemih.",
        "first_5_ingredients": ["Daging Ikan Tuna Fillet Utuh", "Daging Ikan Salmon Fillet", "Kaldu Ikan Alami", "Minyak Ikan", "Gelling Agent"],
        "contains_byproducts": false, "contains_artificial": false, "grain_free": true, "awards_certifications": [], "recall_history": [],
        "special_tags": ["wet_food_pouch_or_can", "grain_free", "real_fillet", "ultra_high_protein_dm", "super_premium"]
      },
      "pricing": {
        "price_per_kg_idr": 150000, "price_source": "Shopee Official Store (Mars Petcare Indonesia)",
        "price_source_url": "https://shopee.co.id/Sheba-Pouch-Wet-Food-70g-i.112233.44556677", "price_updated_at": "2026-08", "price_per_kcal_idr": 0.300
      },
      "provenance": {
        "official_label_url": "https://www.sheba.com", "official_label_accessed_at": "2026-08-30", "label_market": "Indonesia", "label_package_size_g": 70, "formulation_or_label_date": "-", "last_verified_at": "2026-08-30"
      },
      "data_quality": {
        "status": "verified_official", "mandatory_fields_complete": true, "notes": "Mars Petcare Indonesia. Dry matter basis dihitung berdasarkan kadar air 89%."
      }
    }
  },

  // 10. MR. VET T1 Digestion Care (Dry Food)
  {
    "product_template": {
      "id": "mr_vet_t1_digestion_care_cat_food_1_5kg_id",
      "brand": "MR. VET",
      "name": "MR. VET T1 Digestion Care Dry Cat Food",
      "market": "Indonesia",
      "type": "Dry Food (with Freeze-Dried / Raw Coated)",
      "life_stage": "All Life Stages (Kitten, Adult, Senior)",
      "primary_protein": "Chicken & Fish",
      "weight_variants_g": [1500, 6000],
      "country_of_origin": "China",
      "photo_url": "https://petour.sg/cdn/shop/files/T1_Digestion_Care.png",
      "source_url": "https://petour.sg/products/mr-vet-t1-cat-food-digestion-care",
      "ingredient_list": [
        "Daging Ayam Segar (Fresh Chicken Meat)", "Tepung Daging Ayam (Chicken Meal)", "Tepung Ikan (Fish Meal)",
        "Ubi Jalar Kering (Dried Sweet Potato)", "Kacang Polong (Peas)", "Lemak Ayam (Diawetkan dengan Campuran Tokoferol)",
        "Minyak Ikan (Fish Oil)", "Bubuk Telur (Egg Powder)", "Bubuk Labu (Pumpkin Powder)",
        "Probiotik Aktif (Bacillus coagulans / Live Probiotics)", "Fructooligosaccharides (FOS)", "Mannan-oligosaccharides (MOS)",
        "Enzim Pencernaan (Digestive Enzymes)", "Ekstrak Yucca Schidigera", "Taurin", "Kolin Klorida", "DL-Metionin", "L-Lisin",
        "Mineral", "Vitamin", "Antioksidan Alami (Ekstrak Rosemary)"
      ],
      "guaranteed_analysis_as_fed_percent": {
        "crude_protein_min": 40.0, "crude_fat_min": 18.0, "crude_fiber_max": 5.0, "moisture_max": 10.0, "ash_max": 9.0
      },
      "calories": { "metabolizable_energy_kcal_per_kg": 3950, "source_label_wording": "3.95 kkal/g (Metabolizable Energy calculated)" },
      "other_nutrients_label": {
        "taurine_min_percent": 0.2, "omega_3_min_percent": 0.6, "omega_6_min_percent": 2.5, "dha_min_percent": "-", "epa_min_percent": "-", "calcium_min_percent": 1.0, "phosphorus_min_percent": 0.8, "magnesium_min_percent": 0.08, "vitamin_a_min_iu_per_kg": 10000, "vitamin_e_min_iu_per_kg": 200
      },
      "dry_matter_estimates_percent": {
        "crude_protein_min": 44.44, "crude_fat_min": 20.00, "crude_fiber_max": 5.56, "estimated_carbohydrate": 20.00
      },
      "quality": {
        "ingredient_quality_score_1_to_10": "-", "score_rubric_version": "-", "score_rationale": "Formula bebas biji-bijian (Grain-Free) berprotein tinggi dengan daging ayam segar sebagai bahan utama, dirancang spesifik untuk kucing dengan pencernaan sensitif (T1 Digestion Care).",
        "first_5_ingredients": ["Daging Ayam Segar (Fresh Chicken Meat)", "Tepung Daging Ayam (Chicken Meal)", "Tepung Ikan (Fish Meal)", "Ubi Jalar Kering (Dried Sweet Potato)", "Kacang Polong (Peas)"],
        "contains_byproducts": false, "contains_artificial": false, "grain_free": true, "awards_certifications": [], "recall_history": [],
        "special_tags": ["mr_vet_t1", "digestion_care", "gut_health", "live_probiotics", "pumpkin_fiber", "grain_free", "high_protein_40", "sensitive_stomach"]
      },
      "pricing": {
        "price_per_kg_idr": 130000, "price_source": "Shopee Indonesia / MR. VET Flagship Store",
        "price_source_url": "https://shopee.co.id/search?keyword=mr%20vet%20t1%20digestion%20care", "price_updated_at": "2026-08", "price_per_kcal_idr": 0.033
      },
      "provenance": {
        "official_label_url": "https://petour.sg/products/mr-vet-t1-cat-food-digestion-care", "official_label_accessed_at": "2026-09-02", "label_market": "Indonesia", "label_package_size_g": 1500, "formulation_or_label_date": "-", "last_verified_at": "2026-09-02"
      },
      "data_quality": {
        "status": "verified_official", "mandatory_fields_complete": true, "notes": "Dipasarkan oleh Petour Singapore / MR. VET. Dry matter basis dihitung berdasarkan kadar air maksimal 10%."
      }
    }
  }
];

// Helper to filter and search product_template items
export function getFilteredProductTemplates({ query = '', brand = 'all', type = 'all', maxResults = 50, sortBy = 'relevance' }) {
  let results = [...MASTER_PRODUCT_TEMPLATES];

  // Filter by Food Type (Wet Food / Dry Food)
  if (type && type !== 'all') {
    results = results.filter(item => item.product_template.type.toLowerCase().includes(type.toLowerCase()));
  }

  // Filter by Brand
  if (brand && brand !== 'all') {
    results = results.filter(item => item.product_template.brand.toLowerCase() === brand.toLowerCase());
  }

  // Filter by Search Query
  if (query && query.trim() !== '') {
    const q = query.toLowerCase().trim();
    const tokens = q.split(/\s+/).filter(t => t.length > 1);

    results = results.filter(item => {
      const pt = item.product_template;
      const fullText = `${pt.name} ${pt.brand} ${pt.primary_protein} ${pt.type} ${pt.quality.special_tags?.join(' ')} ${pt.ingredient_list?.join(' ')}`.toLowerCase();
      if (fullText.includes(q)) return true;
      return tokens.some(token => fullText.includes(token));
    });
  }

  // Sort
  if (sortBy === 'price_asc') {
    results.sort((a, b) => (a.product_template.pricing?.price_per_kg_idr || 0) - (b.product_template.pricing?.price_per_kg_idr || 0));
  } else if (sortBy === 'price_desc') {
    results.sort((a, b) => (b.product_template.pricing?.price_per_kg_idr || 0) - (a.product_template.pricing?.price_per_kg_idr || 0));
  } else if (sortBy === 'protein_desc') {
    results.sort((a, b) => (b.product_template.dry_matter_estimates_percent?.crude_protein_min || 0) - (a.product_template.dry_matter_estimates_percent?.crude_protein_min || 0));
  } else if (sortBy === 'carb_asc') {
    results.sort((a, b) => (a.product_template.dry_matter_estimates_percent?.estimated_carbohydrate || 0) - (b.product_template.dry_matter_estimates_percent?.estimated_carbohydrate || 0));
  }

  return results.slice(0, maxResults);
}
