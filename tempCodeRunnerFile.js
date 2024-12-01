const { MongoClient } = require('mongodb');

// Thay đổi thông tin kết nối với MongoDB của bạn
const uri = 'mongodb+srv://lam208:4BvCFILelDXTUOv1@cluster0.gcqyosi.mongodb.net/';

// Tên cơ sở dữ liệu
const databaseName = "auto_document_reader";

async function createDatabaseAndCollections() {
  const client = new MongoClient(uri);
  try {
    // Kết nối tới MongoDB
    await client.connect();
    console.log("Kết nối thành công tới MongoDB!");

    const db = client.db(databaseName);

    // Tạo collection: users
    await db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['email', 'password', 'created_at'],
          properties: {
            email: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            password: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            name: {
              bsonType: 'string',
              description: 'optional user name'
            },
            role: {
              enum: ['user', 'admin'],
              description: 'role can only be user or admin'
            },
            created_at: {
              bsonType: 'date',
              description: 'creation date is required'
            },
            updated_at: {
              bsonType: 'date',
              description: 'last updated date'
            }
          }
        }
      }
    });    
    console.log("Tạo collection 'users' thành công!");

    // Tạo collection: documents
    await db.createCollection('documents', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['user_id', 'original_name', 'file_path', 'uploaded_at'],
          properties: {
            user_id: {
              bsonType: 'objectId',
              description: 'must reference a valid user id'
            },
            original_name: {
              bsonType: 'string',
              description: 'original file name is required'
            },
            file_path: {
              bsonType: 'string',
              description: 'file path is required'
            },
            file_size: {
              bsonType: 'number',
              description: 'optional file size in MB'
            },
            uploaded_at: {
              bsonType: 'date',
              description: 'upload date is required'
            }
          }
        }
      }
    });
    
    console.log("Tạo collection 'documents' thành công!");

    // Tạo collection: processed_data
    await db.createCollection('processed_data', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['document_id', 'user_id', 'processed_at'],
          properties: {
            document_id: {
              bsonType: 'objectId',
              description: 'must reference a valid document id'
            },
            user_id: {
              bsonType: 'objectId',
              description: 'must reference a valid user id'
            },
            extracted_text: {
              bsonType: 'string',
              description: 'optional extracted text'
            },
            translated_text: {
              bsonType: 'string',
              description: 'optional translated text'
            },
            audio_file_path: {
              bsonType: 'string',
              description: 'optional path to audio file'
            },
            language: {
              bsonType: 'string',
              description: 'language of the audio or text'
            },
            voice_type: {
              enum: ['male', 'female'],
              description: 'optional, defines voice type'
            },
            processed_at: {
              bsonType: 'date',
              description: 'processing date is required'
            }
          }
        }
      }
    });    
    console.log("Tạo collection 'processed_data' thành công!");
  } catch (error) {
    console.error("Lỗi khi tạo database và collections:", error);
  } finally {
    // Đóng kết nối
    await client.close();
    console.log("Kết nối đã được đóng.");
  }
}

createDatabaseAndCollections();