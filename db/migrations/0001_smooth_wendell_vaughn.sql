-- Custom SQL migration

-- Create ENUMs
DO $$ BEGIN
    CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'expired', 'pending');
    CREATE TYPE subscription_frequency AS ENUM ('monthly', 'quarterly', 'yearly', 'custom');
    CREATE TYPE alert_type AS ENUM ('price_increase', 'renewal_reminder', 'payment_failed', 'subscription_cancelled', 'subscription_expired', 'custom');
    CREATE TYPE alert_status AS ENUM ('pending', 'sent', 'failed', 'dismissed');
    CREATE TYPE payment_status AS ENUM ('pending', 'successful', 'failed', 'refunded');
    CREATE TYPE payment_method AS ENUM ('credit_card', 'debit_card', 'bank_transfer', 'paypal', 'other');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Drop existing todos table
DROP TABLE IF EXISTS todos;

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id text NOT NULL,
    name text NOT NULL,
    description text,
    amount numeric NOT NULL,
    currency text NOT NULL,
    frequency subscription_frequency NOT NULL,
    status subscription_status NOT NULL DEFAULT 'active',
    next_billing_date timestamp NOT NULL,
    last_billing_date timestamp,
    provider text,
    provider_subscription_id text,
    auto_renew boolean NOT NULL DEFAULT true,
    is_automatically_detected boolean NOT NULL DEFAULT false,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
);

-- Create currencies table
CREATE TABLE IF NOT EXISTS currencies (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    code text NOT NULL UNIQUE,
    name text NOT NULL,
    symbol text NOT NULL,
    exchange_rate numeric NOT NULL,
    is_base_currency boolean NOT NULL DEFAULT false,
    last_updated timestamp NOT NULL DEFAULT now(),
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
);

-- Create alerts table
CREATE TABLE IF NOT EXISTS alerts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id text NOT NULL,
    subscription_id uuid REFERENCES subscriptions(id) ON DELETE CASCADE,
    type alert_type NOT NULL,
    status alert_status NOT NULL DEFAULT 'pending',
    title text NOT NULL,
    message text NOT NULL,
    is_read boolean NOT NULL DEFAULT false,
    scheduled_for timestamp,
    sent_at timestamp,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id text NOT NULL,
    subscription_id uuid REFERENCES subscriptions(id) ON DELETE SET NULL,
    amount numeric NOT NULL,
    currency text NOT NULL,
    status payment_status NOT NULL,
    method payment_method NOT NULL,
    transaction_id text,
    provider text,
    description text,
    billing_period_start timestamp,
    billing_period_end timestamp,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
);
