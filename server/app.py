import torch
import pandas as pd
import numpy as np
from datasets import Dataset
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments

df = pd.read_csv(r"C:\Users\pauls\Downloads\final_cleaned_data.csv")
df['input_text'] = df['title'] + " " + df['text']
print(df.head())

train_texts, temp_texts, train_labels, temp_labels = train_test_split(
    df['input_text'], df['target'], test_size=0.2, random_state=42)

val_texts, test_texts, val_labels, test_labels = train_test_split(
    temp_texts, temp_labels, test_size=0.5, random_state=42)

print(f"Training samples: {len(train_texts)}")
print(f"Validation samples: {len(val_texts)}")
print(f"Test samples: {len(test_texts)}")

# Load pre-trained BERT tokenizer
tokenizer = AutoTokenizer.from_pretrained("bert-large-uncased")

# Tokenization function
def tokenize_function(texts):
    return tokenizer(list(texts), padding="max_length", truncation=True)

# Tokenize each set
train_encodings = tokenize_function(train_texts)
val_encodings = tokenize_function(val_texts)
test_encodings = tokenize_function(test_texts)

# Convert tokenized data into Dataset format
train_dataset = Dataset.from_dict({
    'input_ids': train_encodings['input_ids'],
    'attention_mask': train_encodings['attention_mask'],
    'labels': list(train_labels)
})

val_dataset = Dataset.from_dict({
    'input_ids': val_encodings['input_ids'],
    'attention_mask': val_encodings['attention_mask'],
    'labels': list(val_labels)
})

test_dataset = Dataset.from_dict({
    'input_ids': test_encodings['input_ids'],
    'attention_mask': test_encodings['attention_mask'],
    'labels': list(test_labels)
})

# Convert to PyTorch tensors for Trainer compatibility
train_dataset.set_format(type='torch', columns=['input_ids', 'attention_mask', 'labels'])
val_dataset.set_format(type='torch', columns=['input_ids', 'attention_mask', 'labels'])
test_dataset.set_format(type='torch', columns=['input_ids', 'attention_mask', 'labels'])

from transformers import AutoModelForSequenceClassification

model = AutoModelForSequenceClassification.from_pretrained("bert-large-uncased", num_labels=5)

training_args = TrainingArguments(
    output_dir='./results',              # Output directory for results
    num_train_epochs=5,                  # Number of training epochs
    per_device_train_batch_size=16,      # Training batch size
    per_device_eval_batch_size=64,       # Evaluation batch size
    warmup_steps=500,                    # Warmup steps for the learning rate scheduler
    weight_decay=0.01,                   # Weight decay for regularization
    logging_dir='./logs',                # Directory for logs
    evaluation_strategy="epoch",         # Evaluate at the end of each epoch
    save_strategy="epoch",               # Save model after each epoch
    load_best_model_at_end=True,         # Load the best model after training
    metric_for_best_model="accuracy"    # Metric for the best model
)

# Compute accuracy
def compute_metrics(eval_pred):
    predictions, labels = eval_pred
    predictions = np.argmax(predictions, axis=-1)  # Convert logits to class predictions
    accuracy = accuracy_score(labels, predictions)
    return {"accuracy": accuracy}


trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=val_dataset,
    compute_metrics=compute_metrics
)

trainer.train()

model.save('fine_tuned_model')
tokenizer.save_pretrained('fine_tune_model')