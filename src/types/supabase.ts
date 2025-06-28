export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      certificate_master: {
        Row: {
          certificate_country: string | null;
          certificate_name_arabic: string | null;
          certificate_name_english: string | null;
          certificate_status: boolean | null;
          id: string;
          inserted_at: string;
          issue_authority: string | null;
          issue_year: string | null;
          number_of_hours: string | null;
          skill_category: string | null;
          skill_level: string | null;
          skill_type: string | null;
          tags: Json | null;
        };
        Insert: {
          certificate_country?: string | null;
          certificate_name_arabic?: string | null;
          certificate_name_english?: string | null;
          certificate_status?: boolean | null;
          id?: string;
          inserted_at?: string;
          issue_authority?: string | null;
          issue_year?: string | null;
          number_of_hours?: string | null;
          skill_category?: string | null;
          skill_level?: string | null;
          skill_type?: string | null;
          tags?: Json | null;
        };
        Update: {
          certificate_country?: string | null;
          certificate_name_arabic?: string | null;
          certificate_name_english?: string | null;
          certificate_status?: boolean | null;
          id?: string;
          inserted_at?: string;
          issue_authority?: string | null;
          issue_year?: string | null;
          number_of_hours?: string | null;
          skill_category?: string | null;
          skill_level?: string | null;
          skill_type?: string | null;
          tags?: Json | null;
        };
        Relationships: [];
      };
      certificate_v1_v2_mapping: {
        Row: {
          id: number;
          student_id: string | null;
          v1_certificate_id: number | null;
          v2_certificate_id: string | null;
        };
        Insert: {
          id?: number;
          student_id?: string | null;
          v1_certificate_id?: number | null;
          v2_certificate_id?: string | null;
        };
        Update: {
          id?: number;
          student_id?: string | null;
          v1_certificate_id?: number | null;
          v2_certificate_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "certificate_v1_v2_mapping_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "certificate_v1_v2_mapping_v1_certificate_id_fkey";
            columns: ["v1_certificate_id"];
            isOneToOne: false;
            referencedRelation: "upload_certificate";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "certificate_v1_v2_mapping_v2_certificate_id_fkey";
            columns: ["v2_certificate_id"];
            isOneToOne: false;
            referencedRelation: "certificate_master";
            referencedColumns: ["id"];
          },
        ];
      };
      clubs: {
        Row: {
          club_id: number;
          club_name: string | null;
          created_at: string;
        };
        Insert: {
          club_id?: number;
          club_name?: string | null;
          created_at?: string;
        };
        Update: {
          club_id?: number;
          club_name?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      coupon_codes: {
        Row: {
          coupon_code: string | null;
          coupon_id: number | null;
          created_at: string;
          end_date: string | null;
          id: number;
          start_date: string | null;
          status: Database["public"]["Enums"]["coupon_status"] | null;
        };
        Insert: {
          coupon_code?: string | null;
          coupon_id?: number | null;
          created_at?: string;
          end_date?: string | null;
          id?: number;
          start_date?: string | null;
          status?: Database["public"]["Enums"]["coupon_status"] | null;
        };
        Update: {
          coupon_code?: string | null;
          coupon_id?: number | null;
          created_at?: string;
          end_date?: string | null;
          id?: number;
          start_date?: string | null;
          status?: Database["public"]["Enums"]["coupon_status"] | null;
        };
        Relationships: [
          {
            foreignKeyName: "coupon_codes_coupon_id_fkey";
            columns: ["coupon_id"];
            isOneToOne: false;
            referencedRelation: "coupons";
            referencedColumns: ["coupon_id"];
          },
        ];
      };
      coupon_donation_link: {
        Row: {
          coupon_id: number | null;
          created_at: string;
          donation_id: number | null;
          id: number;
          num_of_coupons: number | null;
        };
        Insert: {
          coupon_id?: number | null;
          created_at?: string;
          donation_id?: number | null;
          id?: number;
          num_of_coupons?: number | null;
        };
        Update: {
          coupon_id?: number | null;
          created_at?: string;
          donation_id?: number | null;
          id?: number;
          num_of_coupons?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "coupon_donation_link_coupon_id_fkey";
            columns: ["coupon_id"];
            isOneToOne: false;
            referencedRelation: "coupons";
            referencedColumns: ["coupon_id"];
          },
          {
            foreignKeyName: "coupon_donation_link_donation_id_fkey";
            columns: ["donation_id"];
            isOneToOne: false;
            referencedRelation: "donation";
            referencedColumns: ["donation_id"];
          },
        ];
      };
      coupon_student_interest_mapping: {
        Row: {
          coupon_id: number | null;
          created_at: string;
          id: number;
          student_email: string | null;
        };
        Insert: {
          coupon_id?: number | null;
          created_at?: string;
          id?: number;
          student_email?: string | null;
        };
        Update: {
          coupon_id?: number | null;
          created_at?: string;
          id?: number;
          student_email?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "coupon_interest_mapping_coupon_id_fkey";
            columns: ["coupon_id"];
            isOneToOne: false;
            referencedRelation: "coupons";
            referencedColumns: ["coupon_id"];
          },
        ];
      };
      coupon_student_mapping: {
        Row: {
          coupon_id: number | null;
          created_at: string;
          id: number;
          student_id: string | null;
        };
        Insert: {
          coupon_id?: number | null;
          created_at?: string;
          id?: number;
          student_id?: string | null;
        };
        Update: {
          coupon_id?: number | null;
          created_at?: string;
          id?: number;
          student_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "coupon_user_mapping_coupon_id_fkey";
            columns: ["coupon_id"];
            isOneToOne: false;
            referencedRelation: "coupons";
            referencedColumns: ["coupon_id"];
          },
          {
            foreignKeyName: "coupon_user_mapping_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          },
        ];
      };
      coupons: {
        Row: {
          club_id: number | null;
          coupon_duration: string | null;
          coupon_id: number;
          created_at: string;
          end_date: string | null;
          generated_by: number | null;
          number_of_coupons: number | null;
          program_id: number | null;
          start_date: string | null;
          start_period: string | null;
        };
        Insert: {
          club_id?: number | null;
          coupon_duration?: string | null;
          coupon_id?: number;
          created_at?: string;
          end_date?: string | null;
          generated_by?: number | null;
          number_of_coupons?: number | null;
          program_id?: number | null;
          start_date?: string | null;
          start_period?: string | null;
        };
        Update: {
          club_id?: number | null;
          coupon_duration?: string | null;
          coupon_id?: number;
          created_at?: string;
          end_date?: string | null;
          generated_by?: number | null;
          number_of_coupons?: number | null;
          program_id?: number | null;
          start_date?: string | null;
          start_period?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "coupons_club_id_fkey";
            columns: ["club_id"];
            isOneToOne: false;
            referencedRelation: "clubs";
            referencedColumns: ["club_id"];
          },
          {
            foreignKeyName: "coupons_generated_by_fkey";
            columns: ["generated_by"];
            isOneToOne: false;
            referencedRelation: "roles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "coupons_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["program_id"];
          },
        ];
      };
      donation: {
        Row: {
          amount: number | null;
          charges: number | null;
          created_at: string | null;
          date: string | null;
          donation_description: string | null;
          donation_id: number;
          remaining_amount: number | null;
          source_of_amount: string | null;
          sponsor_id: number;
        };
        Insert: {
          amount?: number | null;
          charges?: number | null;
          created_at?: string | null;
          date?: string | null;
          donation_description?: string | null;
          donation_id?: number;
          remaining_amount?: number | null;
          source_of_amount?: string | null;
          sponsor_id: number;
        };
        Update: {
          amount?: number | null;
          charges?: number | null;
          created_at?: string | null;
          date?: string | null;
          donation_description?: string | null;
          donation_id?: number;
          remaining_amount?: number | null;
          source_of_amount?: string | null;
          sponsor_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "donation_sponsor_id_fkey";
            columns: ["sponsor_id"];
            isOneToOne: false;
            referencedRelation: "sponsor";
            referencedColumns: ["sponsor_id"];
          },
        ];
      };
      donation_allocation: {
        Row: {
          amount: number | null;
          created_at: string;
          id: number;
          program_id: number | null;
        };
        Insert: {
          amount?: number | null;
          created_at?: string;
          id?: number;
          program_id?: number | null;
        };
        Update: {
          amount?: number | null;
          created_at?: string;
          id?: number;
          program_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "donation_allocation_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["program_id"];
          },
        ];
      };
      donation_allocation_log: {
        Row: {
          allocated_amount: number;
          allocated_by: number | null;
          created_at: string;
          donation_id: number;
          id: number;
          program_id: number;
          remaining_allocated_amount: number;
        };
        Insert: {
          allocated_amount: number;
          allocated_by?: number | null;
          created_at?: string;
          donation_id: number;
          id?: number;
          program_id: number;
          remaining_allocated_amount?: number;
        };
        Update: {
          allocated_amount?: number;
          allocated_by?: number | null;
          created_at?: string;
          donation_id?: number;
          id?: number;
          program_id?: number;
          remaining_allocated_amount?: number;
        };
        Relationships: [
          {
            foreignKeyName: "donation_allocation_log_allocated_by_fkey";
            columns: ["allocated_by"];
            isOneToOne: false;
            referencedRelation: "roles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "donation_allocation_log_donation_id_fkey";
            columns: ["donation_id"];
            isOneToOne: false;
            referencedRelation: "donation";
            referencedColumns: ["donation_id"];
          },
          {
            foreignKeyName: "donation_allocation_log_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["program_id"];
          },
        ];
      };
      notifications: {
        Row: {
          created_at: string;
          data: Json | null;
          id: number;
          message: string | null;
          notification_type:
            | Database["public"]["Enums"]["notification_type"]
            | null;
          recipient_id: string | null;
          sender_id: string | null;
          status: Database["public"]["Enums"]["notification_status"] | null;
        };
        Insert: {
          created_at?: string;
          data?: Json | null;
          id?: number;
          message?: string | null;
          notification_type?:
            | Database["public"]["Enums"]["notification_type"]
            | null;
          recipient_id?: string | null;
          sender_id?: string | null;
          status?: Database["public"]["Enums"]["notification_status"] | null;
        };
        Update: {
          created_at?: string;
          data?: Json | null;
          id?: number;
          message?: string | null;
          notification_type?:
            | Database["public"]["Enums"]["notification_type"]
            | null;
          recipient_id?: string | null;
          sender_id?: string | null;
          status?: Database["public"]["Enums"]["notification_status"] | null;
        };
        Relationships: [
          {
            foreignKeyName: "notifications_recipient_id_fkey";
            columns: ["recipient_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "notifications_sender_id_fkey";
            columns: ["sender_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      parent_child_relationship: {
        Row: {
          child_id: string;
          created_at: string;
          is_parent_request_approved: boolean | null;
          parent_id: string;
        };
        Insert: {
          child_id: string;
          created_at?: string;
          is_parent_request_approved?: boolean | null;
          parent_id?: string;
        };
        Update: {
          child_id?: string;
          created_at?: string;
          is_parent_request_approved?: boolean | null;
          parent_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "parent_child_relationship_child_id_fkey";
            columns: ["child_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "parent_child_relationship_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      plan_cancel_request: {
        Row: {
          completion_date: string | null;
          current_plan: string | null;
          email: string | null;
          id: number;
          plan_price: string | null;
          reason: string | null;
          status: string | null;
          user_id: string;
        };
        Insert: {
          completion_date?: string | null;
          current_plan?: string | null;
          email?: string | null;
          id?: number;
          plan_price?: string | null;
          reason?: string | null;
          status?: string | null;
          user_id?: string;
        };
        Update: {
          completion_date?: string | null;
          current_plan?: string | null;
          email?: string | null;
          id?: number;
          plan_price?: string | null;
          reason?: string | null;
          status?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "plan-cancel-request_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      plan_upgrade_request: {
        Row: {
          current_plan: string | null;
          current_price: string | null;
          email: string | null;
          id: number;
          status: string | null;
          upgrade_plan: string | null;
          upgrade_price: string | null;
          user_id: string;
        };
        Insert: {
          current_plan?: string | null;
          current_price?: string | null;
          email?: string | null;
          id?: number;
          status?: string | null;
          upgrade_plan?: string | null;
          upgrade_price?: string | null;
          user_id?: string;
        };
        Update: {
          current_plan?: string | null;
          current_price?: string | null;
          email?: string | null;
          id?: number;
          status?: string | null;
          upgrade_plan?: string | null;
          upgrade_price?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "plan-upgrade-request_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      player_data_testing: {
        Row: {
          eliminated: string | null;
          id: number;
          lap_time: number | null;
          player_id: string;
          position: number | null;
          race_date: string | null;
          race_time: number | null;
          race_type: string | null;
          reaction_time: number | null;
          speed: number | null;
          track_distance: number | null;
        };
        Insert: {
          eliminated?: string | null;
          id?: number;
          lap_time?: number | null;
          player_id: string;
          position?: number | null;
          race_date?: string | null;
          race_time?: number | null;
          race_type?: string | null;
          reaction_time?: number | null;
          speed?: number | null;
          track_distance?: number | null;
        };
        Update: {
          eliminated?: string | null;
          id?: number;
          lap_time?: number | null;
          player_id?: string;
          position?: number | null;
          race_date?: string | null;
          race_time?: number | null;
          race_type?: string | null;
          reaction_time?: number | null;
          speed?: number | null;
          track_distance?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "player_data_testing_player_id_fkey";
            columns: ["player_id"];
            isOneToOne: false;
            referencedRelation: "register_player";
            referencedColumns: ["player_id"];
          },
        ];
      };
      player_race_stats: {
        Row: {
          best_reaction_time: number | null;
          city_rank: number | null;
          country_rank: number | null;
          id: number;
          last_updated: string | null;
          num_races: number | null;
          player_id: string;
          race_type: string;
          top_speed: number | null;
          world_rank: number | null;
        };
        Insert: {
          best_reaction_time?: number | null;
          city_rank?: number | null;
          country_rank?: number | null;
          id?: number;
          last_updated?: string | null;
          num_races?: number | null;
          player_id: string;
          race_type: string;
          top_speed?: number | null;
          world_rank?: number | null;
        };
        Update: {
          best_reaction_time?: number | null;
          city_rank?: number | null;
          country_rank?: number | null;
          id?: number;
          last_updated?: string | null;
          num_races?: number | null;
          player_id?: string;
          race_type?: string;
          top_speed?: number | null;
          world_rank?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "player_race_stats_player_id_fkey";
            columns: ["player_id"];
            isOneToOne: false;
            referencedRelation: "register_player";
            referencedColumns: ["player_id"];
          },
        ];
      };
      profiles: {
        Row: {
          age: string | null;
          email: string | null;
          gender: string | null;
          id: string;
          is_profile_complete: boolean | null;
          mobile: string | null;
          name: string | null;
          nationality: string | null;
          profile_image_url: string | null;
          role_id: number | null;
          signup_method: Database["public"]["Enums"]["signup_methods"] | null;
          updated_at: string | null;
        };
        Insert: {
          age?: string | null;
          email?: string | null;
          gender?: string | null;
          id: string;
          is_profile_complete?: boolean | null;
          mobile?: string | null;
          name?: string | null;
          nationality?: string | null;
          profile_image_url?: string | null;
          role_id?: number | null;
          signup_method?: Database["public"]["Enums"]["signup_methods"] | null;
          updated_at?: string | null;
        };
        Update: {
          age?: string | null;
          email?: string | null;
          gender?: string | null;
          id?: string;
          is_profile_complete?: boolean | null;
          mobile?: string | null;
          name?: string | null;
          nationality?: string | null;
          profile_image_url?: string | null;
          role_id?: number | null;
          signup_method?: Database["public"]["Enums"]["signup_methods"] | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_role_id_fkey";
            columns: ["role_id"];
            isOneToOne: false;
            referencedRelation: "roles";
            referencedColumns: ["id"];
          },
        ];
      };
      program_certificate: {
        Row: {
          certificate_country: string | null;
          certificate_name_arabic: string | null;
          certificate_name_english: string | null;
          certificate_status: boolean | null;
          club_id: number | null;
          id: string;
          inserted_at: string;
          issue_authority: string | null;
          issue_year: string | null;
          number_of_hours: string | null;
          program_id: number | null;
          skill_category: string | null;
          skill_level: string | null;
          skill_type: string | null;
          tags: Json | null;
        };
        Insert: {
          certificate_country?: string | null;
          certificate_name_arabic?: string | null;
          certificate_name_english?: string | null;
          certificate_status?: boolean | null;
          club_id?: number | null;
          id?: string;
          inserted_at?: string;
          issue_authority?: string | null;
          issue_year?: string | null;
          number_of_hours?: string | null;
          program_id?: number | null;
          skill_category?: string | null;
          skill_level?: string | null;
          skill_type?: string | null;
          tags?: Json | null;
        };
        Update: {
          certificate_country?: string | null;
          certificate_name_arabic?: string | null;
          certificate_name_english?: string | null;
          certificate_status?: boolean | null;
          club_id?: number | null;
          id?: string;
          inserted_at?: string;
          issue_authority?: string | null;
          issue_year?: string | null;
          number_of_hours?: string | null;
          program_id?: number | null;
          skill_category?: string | null;
          skill_level?: string | null;
          skill_type?: string | null;
          tags?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "program_certificate_club_id_fkey";
            columns: ["club_id"];
            isOneToOne: false;
            referencedRelation: "clubs";
            referencedColumns: ["club_id"];
          },
          {
            foreignKeyName: "program_certificate_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["program_id"];
          },
        ];
      };
      program_certificate_student_mapping: {
        Row: {
          completion_status: boolean | null;
          coupon_id: number | null;
          created_at: string;
          id: number;
          program_certificate_id: string | null;
          rating: number | null;
          student_id: string | null;
        };
        Insert: {
          completion_status?: boolean | null;
          coupon_id?: number | null;
          created_at?: string;
          id?: number;
          program_certificate_id?: string | null;
          rating?: number | null;
          student_id?: string | null;
        };
        Update: {
          completion_status?: boolean | null;
          coupon_id?: number | null;
          created_at?: string;
          id?: number;
          program_certificate_id?: string | null;
          rating?: number | null;
          student_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "program_certificate_student_mapping_coupon_id_fkey";
            columns: ["coupon_id"];
            isOneToOne: false;
            referencedRelation: "coupons";
            referencedColumns: ["coupon_id"];
          },
          {
            foreignKeyName: "program_certificate_student_mapping_program_certificate_id_fkey";
            columns: ["program_certificate_id"];
            isOneToOne: false;
            referencedRelation: "program_certificate";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "program_certificate_student_mapping_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          },
        ];
      };
      program_subscription: {
        Row: {
          club_id: number | null;
          created_at: string;
          effective_from: string | null;
          effective_to: string | null;
          id: number;
          plan_1_month: number | null;
          plan_12_month: number | null;
          plan_3_month: number | null;
          program_id: number | null;
          subscription_status: string | null;
          subscription_type: string | null;
        };
        Insert: {
          club_id?: number | null;
          created_at?: string;
          effective_from?: string | null;
          effective_to?: string | null;
          id?: number;
          plan_1_month?: number | null;
          plan_12_month?: number | null;
          plan_3_month?: number | null;
          program_id?: number | null;
          subscription_status?: string | null;
          subscription_type?: string | null;
        };
        Update: {
          club_id?: number | null;
          created_at?: string;
          effective_from?: string | null;
          effective_to?: string | null;
          id?: number;
          plan_1_month?: number | null;
          plan_12_month?: number | null;
          plan_3_month?: number | null;
          program_id?: number | null;
          subscription_status?: string | null;
          subscription_type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "program_subscription_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["program_id"];
          },
        ];
      };
      programs: {
        Row: {
          club_id: number | null;
          created_at: string;
          description: string | null;
          period: string | null;
          program_arabic_name: string | null;
          program_english_name: string | null;
          program_file_url: string | null;
          program_id: number;
          program_picture_url: string[] | null;
          program_video_url: string | null;
          start_date: string | null;
          status: string | null;
          subscription_value: string | null;
          total_allocated_donation: number;
          total_remaining_donation: number;
        };
        Insert: {
          club_id?: number | null;
          created_at?: string;
          description?: string | null;
          period?: string | null;
          program_arabic_name?: string | null;
          program_english_name?: string | null;
          program_file_url?: string | null;
          program_id?: number;
          program_picture_url?: string[] | null;
          program_video_url?: string | null;
          start_date?: string | null;
          status?: string | null;
          subscription_value?: string | null;
          total_allocated_donation?: number;
          total_remaining_donation?: number;
        };
        Update: {
          club_id?: number | null;
          created_at?: string;
          description?: string | null;
          period?: string | null;
          program_arabic_name?: string | null;
          program_english_name?: string | null;
          program_file_url?: string | null;
          program_id?: number;
          program_picture_url?: string[] | null;
          program_video_url?: string | null;
          start_date?: string | null;
          status?: string | null;
          subscription_value?: string | null;
          total_allocated_donation?: number;
          total_remaining_donation?: number;
        };
        Relationships: [
          {
            foreignKeyName: "programs_club_id_fkey";
            columns: ["club_id"];
            isOneToOne: false;
            referencedRelation: "clubs";
            referencedColumns: ["club_id"];
          },
        ];
      };
      projects: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      register_player: {
        Row: {
          city: string | null;
          country: string | null;
          player_id: string;
          student_id: string | null;
        };
        Insert: {
          city?: string | null;
          country?: string | null;
          player_id: string;
          student_id?: string | null;
        };
        Update: {
          city?: string | null;
          country?: string | null;
          player_id?: string;
          student_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "register_player_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          },
        ];
      };
      roles: {
        Row: {
          id: number;
          role: string | null;
        };
        Insert: {
          id?: number;
          role?: string | null;
        };
        Update: {
          id?: number;
          role?: string | null;
        };
        Relationships: [];
      };
      skill_category: {
        Row: {
          id: number;
          name: string | null;
          skill_type_id: number | null;
        };
        Insert: {
          id?: number;
          name?: string | null;
          skill_type_id?: number | null;
        };
        Update: {
          id?: number;
          name?: string | null;
          skill_type_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "skill_category_skill_type_id_fkey";
            columns: ["skill_type_id"];
            isOneToOne: false;
            referencedRelation: "skill_types";
            referencedColumns: ["id"];
          },
        ];
      };
      skill_hashtags: {
        Row: {
          id: number;
          skill_category_id: number | null;
          skill_hashtag: string | null;
        };
        Insert: {
          id?: number;
          skill_category_id?: number | null;
          skill_hashtag?: string | null;
        };
        Update: {
          id?: number;
          skill_category_id?: number | null;
          skill_hashtag?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "skill_hashtags_skill_category_id_fkey";
            columns: ["skill_category_id"];
            isOneToOne: false;
            referencedRelation: "skill_category";
            referencedColumns: ["id"];
          },
        ];
      };
      skill_tags: {
        Row: {
          id: number;
          name: string | null;
          skill_category_id: number | null;
        };
        Insert: {
          id?: number;
          name?: string | null;
          skill_category_id?: number | null;
        };
        Update: {
          id?: number;
          name?: string | null;
          skill_category_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "skill_tags_skill_category_id_fkey";
            columns: ["skill_category_id"];
            isOneToOne: false;
            referencedRelation: "skill_category";
            referencedColumns: ["id"];
          },
        ];
      };
      skill_types: {
        Row: {
          id: number;
          skill_type_name: string | null;
        };
        Insert: {
          id?: number;
          skill_type_name?: string | null;
        };
        Update: {
          id?: number;
          skill_type_name?: string | null;
        };
        Relationships: [];
      };
      skills: {
        Row: {
          id: number;
          name: string | null;
          skill_hashtag_id: number | null;
        };
        Insert: {
          id?: number;
          name?: string | null;
          skill_hashtag_id?: number | null;
        };
        Update: {
          id?: number;
          name?: string | null;
          skill_hashtag_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "skills_skill_hashtag_id_fkey";
            columns: ["skill_hashtag_id"];
            isOneToOne: false;
            referencedRelation: "skill_hashtags";
            referencedColumns: ["id"];
          },
        ];
      };
      special_deal_email_send: {
        Row: {
          email_id: string | null;
          id: number;
          program_id: number | null;
          send_date: string | null;
          status: string | null;
          user_id: string | null;
        };
        Insert: {
          email_id?: string | null;
          id?: number;
          program_id?: number | null;
          send_date?: string | null;
          status?: string | null;
          user_id?: string | null;
        };
        Update: {
          email_id?: string | null;
          id?: number;
          program_id?: number | null;
          send_date?: string | null;
          status?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "special_deal_email_send_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["program_id"];
          },
          {
            foreignKeyName: "special_deal_email_send_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      "special-deal-email-templates": {
        Row: {
          created_at: string;
          email_subject: string | null;
          id: number;
          template_content: string | null;
          template_name: string | null;
        };
        Insert: {
          created_at?: string;
          email_subject?: string | null;
          id?: number;
          template_content?: string | null;
          template_name?: string | null;
        };
        Update: {
          created_at?: string;
          email_subject?: string | null;
          id?: number;
          template_content?: string | null;
          template_name?: string | null;
        };
        Relationships: [];
      };
      sponsor: {
        Row: {
          address: string | null;
          company: string | null;
          email: string | null;
          name: string | null;
          phone_number: string | null;
          sponsor_id: number;
          user_id: string | null;
        };
        Insert: {
          address?: string | null;
          company?: string | null;
          email?: string | null;
          name?: string | null;
          phone_number?: string | null;
          sponsor_id?: number;
          user_id?: string | null;
        };
        Update: {
          address?: string | null;
          company?: string | null;
          email?: string | null;
          name?: string | null;
          phone_number?: string | null;
          sponsor_id?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "sponsor_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      sponsor_student_support: {
        Row: {
          created_at: string;
          id: number;
          program_id: number;
          sponsor_id: number;
          student_id: string;
          support_status: boolean;
        };
        Insert: {
          created_at?: string;
          id?: number;
          program_id: number;
          sponsor_id: number;
          student_id: string;
          support_status: boolean;
        };
        Update: {
          created_at?: string;
          id?: number;
          program_id?: number;
          sponsor_id?: number;
          student_id?: string;
          support_status?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "sponsor_student_support_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["program_id"];
          },
          {
            foreignKeyName: "sponsor_student_support_sponsor_id_fkey";
            columns: ["sponsor_id"];
            isOneToOne: false;
            referencedRelation: "sponsor";
            referencedColumns: ["sponsor_id"];
          },
          {
            foreignKeyName: "sponsor_student_support_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          },
        ];
      };
      student_interest: {
        Row: {
          club_id: number | null;
          created_at: string;
          date_submitted: string | null;
          id: number;
          program_id: number | null;
          user_email: string | null;
        };
        Insert: {
          club_id?: number | null;
          created_at?: string;
          date_submitted?: string | null;
          id?: number;
          program_id?: number | null;
          user_email?: string | null;
        };
        Update: {
          club_id?: number | null;
          created_at?: string;
          date_submitted?: string | null;
          id?: number;
          program_id?: number | null;
          user_email?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "student_interest_club_id_fkey";
            columns: ["club_id"];
            isOneToOne: false;
            referencedRelation: "clubs";
            referencedColumns: ["club_id"];
          },
          {
            foreignKeyName: "student_interest_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["program_id"];
          },
        ];
      };
      students: {
        Row: {
          age_group: string | null;
          created_at: string;
          email: string | null;
          gender: string | null;
          id: string;
          image_url: string | null;
          mobile: string | null;
          name: string | null;
          nationality: string | null;
          profile_id: string | null;
        };
        Insert: {
          age_group?: string | null;
          created_at?: string;
          email?: string | null;
          gender?: string | null;
          id: string;
          image_url?: string | null;
          mobile?: string | null;
          name?: string | null;
          nationality?: string | null;
          profile_id?: string | null;
        };
        Update: {
          age_group?: string | null;
          created_at?: string;
          email?: string | null;
          gender?: string | null;
          id?: string;
          image_url?: string | null;
          mobile?: string | null;
          name?: string | null;
          nationality?: string | null;
          profile_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "students_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      subscription: {
        Row: {
          id: number;
          project_id: number;
          student_id: string | null;
          subscription: number | null;
        };
        Insert: {
          id?: number;
          project_id: number;
          student_id?: string | null;
          subscription?: number | null;
        };
        Update: {
          id?: number;
          project_id?: number;
          student_id?: string | null;
          subscription?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "subscription_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "subscription_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          },
        ];
      };
      tags: {
        Row: {
          id: number;
          skill_type_id: number | null;
          tag: string | null;
        };
        Insert: {
          id?: number;
          skill_type_id?: number | null;
          tag?: string | null;
        };
        Update: {
          id?: number;
          skill_type_id?: number | null;
          tag?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tags_skill_type_id_fkey";
            columns: ["skill_type_id"];
            isOneToOne: false;
            referencedRelation: "skill_types";
            referencedColumns: ["id"];
          },
        ];
      };
      top_programs: {
        Row: {
          club_id: number | null;
          created_at: string;
          id: number;
          program_id: number | null;
        };
        Insert: {
          club_id?: number | null;
          created_at?: string;
          id?: number;
          program_id?: number | null;
        };
        Update: {
          club_id?: number | null;
          created_at?: string;
          id?: number;
          program_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "top_programs_club_id_fkey";
            columns: ["club_id"];
            isOneToOne: false;
            referencedRelation: "clubs";
            referencedColumns: ["club_id"];
          },
          {
            foreignKeyName: "top_programs_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["program_id"];
          },
        ];
      };
      upload_certificate: {
        Row: {
          certificate_asserted: string | null;
          certificate_image_url: string | null;
          certificate_name: string | null;
          id: number;
          skill_category: string | null;
          skill_tag: string | null;
          skill_type: string | null;
          student_id: string;
        };
        Insert: {
          certificate_asserted?: string | null;
          certificate_image_url?: string | null;
          certificate_name?: string | null;
          id?: number;
          skill_category?: string | null;
          skill_tag?: string | null;
          skill_type?: string | null;
          student_id: string;
        };
        Update: {
          certificate_asserted?: string | null;
          certificate_image_url?: string | null;
          certificate_name?: string | null;
          id?: number;
          skill_category?: string | null;
          skill_tag?: string | null;
          skill_type?: string | null;
          student_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "upload_certificate_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          },
        ];
      };
      user_interest_mapping: {
        Row: {
          created_at: string;
          id: number;
          interest_id: number | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          interest_id?: number | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          interest_id?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_interest_mapping_interest_id_fkey";
            columns: ["interest_id"];
            isOneToOne: false;
            referencedRelation: "student_interest";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_interest_mapping_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      calculate_best_reaction_time: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      calculate_city_rank: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      calculate_country_rank: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      calculate_num_races: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      calculate_player_stats: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      calculate_top_speed: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      calculate_world_rank: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      delete_user: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      get_top_speed: {
        Args: { player_id: string; race_type: string };
        Returns: {
          race_type_selected: string;
          top_speed: number;
        }[];
      };
    };
    Enums: {
      app_role:
        | "super-admin"
        | "admin"
        | "admin-sponsor"
        | "sponsor"
        | "student";
      coupon_status:
        | "coupon generated"
        | "coupon expired"
        | "coupon in progress"
        | "coupon redeemed"
        | "program completed"
        | "program not completed";
      notification_status: "pending" | "read" | "accepted" | "rejected";
      notification_type:
        | "parent_request"
        | "event_update"
        | "system_alert"
        | "parent_request_accepted";
      signup_methods: "email" | "google" | "apple";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      app_role: ["super-admin", "admin", "admin-sponsor", "sponsor", "student"],
      coupon_status: [
        "coupon generated",
        "coupon expired",
        "coupon in progress",
        "coupon redeemed",
        "program completed",
        "program not completed",
      ],
      notification_status: ["pending", "read", "accepted", "rejected"],
      notification_type: [
        "parent_request",
        "event_update",
        "system_alert",
        "parent_request_accepted",
      ],
      signup_methods: ["email", "google", "apple"],
    },
  },
} as const;
