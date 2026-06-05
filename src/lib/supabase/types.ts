export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      shops: {
        Row: {
          id: string;
          slug: string;
          name: string;
          owner_name: string;
          phone: string;
          email: string;
          logo_url: string | null;
          support_phone: string;
          default_district: string;
          default_courier: string;
          plan: string;
          status: string;
          billing_notes: string;
          support_notes: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["shops"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["shops"]["Row"]>;
        Relationships: [];
      };
      shop_members: {
        Row: {
          id: string;
          shop_id: string;
          user_id: string;
          role: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["shop_members"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["shop_members"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "shop_members_shop_id_fkey";
            columns: ["shop_id"];
            isOneToOne: false;
            referencedRelation: "shops";
            referencedColumns: ["id"];
          }
        ];
      };
      platform_admins: {
        Row: {
          user_id: string;
          role: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["platform_admins"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["platform_admins"]["Row"]>;
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          shop_id: string;
          slug: string;
          name: string;
          name_bn: string;
          description: string;
          price: number;
          compare_at_price: number | null;
          delivery_charge: number;
          stock: number;
          variants: Json;
          keywords: string[];
          image_url: string;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["products"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["products"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "products_shop_id_fkey";
            columns: ["shop_id"];
            isOneToOne: false;
            referencedRelation: "shops";
            referencedColumns: ["id"];
          }
        ];
      };
      orders: {
        Row: {
          id: string;
          shop_id: string;
          product_id: string;
          customer: Json;
          quantity: number;
          variant: string | null;
          payment_method: string;
          payment_status: string;
          payment_reference: string | null;
          status: string;
          courier_provider: string;
          tracking_id: string | null;
          merchant_notes: string | null;
          customer_notes: string | null;
          subtotal: number;
          delivery_charge: number;
          total: number;
          sla_deadline: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["orders"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["orders"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "orders_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "orders_shop_id_fkey";
            columns: ["shop_id"];
            isOneToOne: false;
            referencedRelation: "shops";
            referencedColumns: ["id"];
          }
        ];
      };
      reply_templates: {
        Row: {
          id: string;
          shop_id: string;
          language: string;
          title: string;
          trigger: string;
          body: string;
          active: boolean;
        };
        Insert: Partial<Database["public"]["Tables"]["reply_templates"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["reply_templates"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "reply_templates_shop_id_fkey";
            columns: ["shop_id"];
            isOneToOne: false;
            referencedRelation: "shops";
            referencedColumns: ["id"];
          }
        ];
      };
      webhook_events: {
        Row: {
          id: string;
          provider: string;
          event_type: string;
          source_id: string;
          matched_product_id: string | null;
          message: string;
          reply: string;
          status: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["webhook_events"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["webhook_events"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "webhook_events_matched_product_id_fkey";
            columns: ["matched_product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      billing_records: {
        Row: {
          id: string;
          shop_id: string;
          plan: string;
          amount: number;
          period: string;
          status: string;
          notes: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["billing_records"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["billing_records"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "billing_records_shop_id_fkey";
            columns: ["shop_id"];
            isOneToOne: false;
            referencedRelation: "shops";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      create_merchant_shop: {
        Args: {
          default_district?: string;
          owner_name?: string;
          shop_name: string;
          support_phone?: string;
        };
        Returns: string;
      };
      is_platform_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
  };
};
