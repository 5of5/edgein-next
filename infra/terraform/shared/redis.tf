locals {
  redis_hostname = "redis-shared.${var.domain_name}"
  redis_uri = "redis://${random_password.redis_password.result}@${local.redis_hostname}:6379"
}

resource "aws_security_group" "allow_redis" {
  name        = "allow_redis"
  description = "Allow Redis inbound traffic"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"  // "-1" stands for all
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "random_password" "redis_password" {
  length  = 32
  special = false
}

data "aws_ami" "amazon_linux_2" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "architecture"
    values = ["arm64"]
  }

  filter {
    name   = "name"
    values = ["al2023-ami-2023*"]
  }
}

# Generates a secure private key and encodes it as PEM
resource "tls_private_key" "key_pair" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "key_pair" {
  key_name   = "redis-key-pair"
  public_key = tls_private_key.key_pair.public_key_openssh
}

resource "aws_instance" "redis" {
  ami                         = data.aws_ami.amazon_linux_2.id
  instance_type               = "t4g.micro"
  vpc_security_group_ids      = [aws_security_group.allow_redis.id]
  subnet_id                   = aws_subnet.database[0].id
  associate_public_ip_address = true
  key_name                    = aws_key_pair.key_pair.key_name

  user_data = <<-EOF
              #!/bin/bash
              sudo yum update -y
              sudo yum install -y docker
              sudo systemctl enable docker
              sudo systemctl start docker
              sudo usermod -a -G docker ec2-user
              sudo docker run -d --name redis-server -p 6379:6379 --restart always redis redis-server --requirepass ${random_password.redis_password.result}
              EOF


  tags = {
    Name = "redis"
  }
}
