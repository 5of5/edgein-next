This Terraform configuration sets up an S3 backend for storing the shared Terraform state. It creates a S3 bucket, AWS KMS key, DynamoDB table, and other necessary resources. These resources are used to provide secure storage and versioning of the Terraform state file.

## Resources

The configuration creates the following resources:

### AWS KMS Key

An AWS KMS (Key Management Service) key is created with the specified configuration. The key enables automatic key rotation and has a deletion window of 10 days.

### AWS KMS Alias

An alias is created for the AWS KMS key. The alias name is defined as `alias/${var.name}` and points to the previously created KMS key.

### AWS S3 Bucket

An S3 bucket is created with the specified name. This bucket serves as the backend for storing the Terraform state file.

### AWS S3 Bucket Ownership Controls

Ownership controls are configured for the S3 bucket. The configuration specifies that object ownership should be preferred to the bucket owner.

### AWS S3 Bucket Public Access Block

Public access to the S3 bucket is blocked by configuring the bucket to block public ACLs, public policies, and public bucket listings.

### AWS S3 Bucket Versioning

Versioning is enabled for the S3 bucket, ensuring that multiple versions of objects can be stored.

### AWS S3 Bucket ACL

The S3 bucket's ACL (Access Control List) is set to "private," ensuring that access to the bucket is restricted.

### AWS S3 Bucket Server-side Encryption Configuration

Server-side encryption is configured for the S3 bucket using the AWS KMS key. The default encryption algorithm is set to "aws:kms" with the specified KMS key ID.

### AWS DynamoDB Table

A DynamoDB table is created with the specified name and configuration. The table uses "PAY_PER_REQUEST" billing mode and has a single hash key named "LockID" of type "S".

## Variables

The configuration expects the following input variables:

- `region`: The AWS region where the resources will be provisioned.
- `name`: A unique identifier for the S3 bucket, KMS key, and DynamoDB table.
